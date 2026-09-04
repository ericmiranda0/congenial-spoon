/**
 * Utility to convert raw Float32 PCM audio data (24kHz mono) to a WAV Blob.
 */
export function rawAudioToWavBlob(
  audioData: Float32Array,
  sampleRate: number = 24000
): Blob {
  const buffer = new ArrayBuffer(44 + audioData.length * 2);
  const view = new DataView(buffer);

  function writeString(offset: number, str: string) {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  }

  // RIFF header
  writeString(0, "RIFF");
  view.setUint32(4, 36 + audioData.length * 2, true);
  writeString(8, "WAVE");

  // fmt chunk
  writeString(12, "fmt ");
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true); // AudioFormat (1 for PCM)
  view.setUint16(22, 1, true); // NumChannels (1 = Mono)
  view.setUint32(24, sampleRate, true); // SampleRate
  view.setUint32(28, sampleRate * 2, true); // ByteRate (SampleRate * NumChannels * BitsPerSample/8)
  view.setUint16(32, 2, true); // BlockAlign (NumChannels * BitsPerSample/8)
  view.setUint16(34, 16, true); // BitsPerSample

  // data chunk
  writeString(36, "data");
  view.setUint32(40, audioData.length * 2, true);

  // Convert Float32 [-1.0, 1.0] to Int16 PCM
  let offset = 44;
  for (let i = 0; i < audioData.length; i++) {
    const s = Math.max(-1, Math.min(1, audioData[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    offset += 2;
  }

  return new Blob([buffer], { type: "audio/wav" });
}

/* ==========================================================================
   IndexedDB Local Cache Management for TTS Audio Blobs
   ========================================================================== */

const DB_NAME = "KokoroTTSCache";
const STORE_NAME = "audio_cache";
const MAX_CACHE_ENTRIES = 100;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB is not available in this environment."));
      return;
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "key" });
        store.createIndex("timestamp", "timestamp", { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Generates a simple hash string for cache keys.
 */
export function generateCacheKey(voice: string, speed: number, text: string): string {
  let hash = 0;
  const str = `${voice}_${speed}_${text}`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return `tts_${hash}`;
}

export async function getCachedAudio(key: string): Promise<Blob | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => {
        if (req.result && req.result.blob) {
          resolve(req.result.blob);
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function setCachedAudio(key: string, blob: Blob): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    store.put({
      key,
      blob,
      timestamp: Date.now(),
    });

    // Prune old entries if exceeding limit
    const index = store.index("timestamp");
    const countReq = store.count();
    countReq.onsuccess = () => {
      if (countReq.result > MAX_CACHE_ENTRIES) {
        const cursorReq = index.openCursor();
        let deleted = 0;
        const toDelete = countReq.result - MAX_CACHE_ENTRIES;
        cursorReq.onsuccess = () => {
          const cursor = cursorReq.result;
          if (cursor && deleted < toDelete) {
            cursor.delete();
            deleted++;
            cursor.continue();
          }
        };
      }
    };
  } catch (err) {
    console.warn("Failed to cache audio in IndexedDB:", err);
  }
}

export async function clearAudioCache(): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.clear();
  } catch (err) {
    console.warn("Failed to clear IndexedDB audio cache:", err);
  }
}

/* ==========================================================================
   Audio Player Wrapper
   ========================================================================== */

export interface AudioPlayerEvents {
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onEnded?: () => void;
  onError?: (err: any) => void;
  onPlay?: () => void;
  onPause?: () => void;
}

export class TTSAudioPlayer {
  private audio: HTMLAudioElement | null = null;
  private currentUrl: string | null = null;
  private events: AudioPlayerEvents = {};

  constructor(events?: AudioPlayerEvents) {
    if (events) this.events = events;
  }

  public setEvents(events: AudioPlayerEvents) {
    this.events = { ...this.events, ...events };
  }

  public async playBlob(blob: Blob, speed: number = 1.0, volume: number = 1.0): Promise<void> {
    this.stop();

    this.currentUrl = URL.createObjectURL(blob);
    this.audio = new Audio(this.currentUrl);
    this.audio.playbackRate = speed;
    this.audio.volume = Math.max(0, Math.min(1, volume));

    this.audio.ontimeupdate = () => {
      if (this.audio && this.events.onTimeUpdate) {
        this.events.onTimeUpdate(this.audio.currentTime, this.audio.duration || 0);
      }
    };

    this.audio.onended = () => {
      if (this.events.onEnded) {
        this.events.onEnded();
      }
    };

    this.audio.onerror = (e) => {
      if (this.events.onError) {
        this.events.onError(e);
      }
    };

    this.audio.onplay = () => {
      if (this.events.onPlay) this.events.onPlay();
    };

    this.audio.onpause = () => {
      if (this.events.onPause) this.events.onPause();
    };

    await this.audio.play();
  }

  public pause(): void {
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
    }
  }

  public resume(): void {
    if (this.audio && this.audio.paused) {
      this.audio.play().catch(console.error);
    }
  }

  public stop(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
    }
    if (this.currentUrl) {
      URL.revokeObjectURL(this.currentUrl);
      this.currentUrl = null;
    }
  }

  public setSpeed(speed: number): void {
    if (this.audio) {
      this.audio.playbackRate = speed;
    }
  }

  public setVolume(volume: number): void {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, volume));
    }
  }

  public seek(seconds: number): void {
    if (this.audio && Number.isFinite(seconds)) {
      this.audio.currentTime = seconds;
    }
  }

  public getCurrentTime(): number {
    return this.audio ? this.audio.currentTime : 0;
  }

  public getDuration(): number {
    return this.audio && Number.isFinite(this.audio.duration) ? this.audio.duration : 0;
  }

  public isPaused(): boolean {
    return this.audio ? this.audio.paused : true;
  }
}
