import { useState, useEffect, useRef, useCallback } from "react";
import {
  KokoroService,
  TextSegment,
  segmentLegalContent,
  AVAILABLE_VOICES,
} from "../../services/kokoro/kokoro";
import { getOrInitKokoroModel, isModelLoaded } from "../../services/kokoro/model";
import { TTSAudioPlayer, clearAudioCache } from "../../services/kokoro/audio";

export type TTSStatus =
  | "idle"
  | "loading"
  | "ready"
  | "generating"
  | "playing"
  | "paused"
  | "error";

export interface TTSSettings {
  voice: string;
  speed: number;
  volume: number;
  continuous: boolean;
}

export function useTextToSpeech(containerRef?: React.RefObject<HTMLElement | null>) {
  const [status, setStatus] = useState<TTSStatus>("idle");
  const [deviceMode, setDeviceMode] = useState<"webgpu" | "wasm">("wasm");
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [progressMessage, setProgressMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [settings, setSettings] = useState<TTSSettings>(() => {
    const saved = localStorage.getItem("tts_settings");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      voice: "pf_dora",
      speed: 1.0,
      volume: 1.0,
      continuous: true,
    };
  });

  const [segments, setSegments] = useState<TextSegment[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const playerRef = useRef<TTSAudioPlayer | null>(null);
  const prefetchBlobRef = useRef<{ index: number; blob: Blob } | null>(null);
  const activeSegmentIdRef = useRef<string | null>(null);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem("tts_settings", JSON.stringify(settings));
  }, [settings]);

  // Highlight segment on screen
  const highlightSegment = useCallback((segment: TextSegment | null) => {
    // Clear existing highlight
    if (activeSegmentIdRef.current) {
      const oldEl = document.getElementById(activeSegmentIdRef.current);
      if (oldEl) {
        oldEl.classList.remove("tts-highlight-active");
      }
    }

    if (segment && segment.element) {
      segment.element.classList.add("tts-highlight-active");
      activeSegmentIdRef.current = segment.element.id;

      // Scroll into view gently
      const rect = segment.element.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      if (!isVisible) {
        segment.element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else {
      activeSegmentIdRef.current = null;
    }
  }, []);

  // Initialize Player
  useEffect(() => {
    playerRef.current = new TTSAudioPlayer({
      onTimeUpdate: (cur, dur) => {
        setCurrentTime(cur);
        setDuration(dur);
      },
      onEnded: () => {
        // Handle segment completion
        onSegmentEnded();
      },
      onError: (err) => {
        console.error("TTS Audio Player Error:", err);
        setStatus("error");
        setErrorMessage("Erro durante a reprodução do áudio.");
      },
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.stop();
      }
      highlightSegment(null);
    };
  }, []);

  // Scan segments from document
  const scanDocument = useCallback(() => {
    const root = containerRef?.current || document.querySelector("main") || document.body;
    const found = segmentLegalContent(root as HTMLElement);
    setSegments(found);
    return found;
  }, [containerRef]);

  // Auto-scan on load
  useEffect(() => {
    scanDocument();
  }, [scanDocument]);

  // Load Model lazily on first action
  const ensureModelLoaded = async (): Promise<boolean> => {
    if (isModelLoaded()) return true;

    setStatus("loading");
    setProgressMessage("Preparando leitor de voz...");
    setDownloadProgress(10);

    try {
      const { device } = await getOrInitKokoroModel((progress) => {
        if (progress.status === "progress" && typeof progress.progress === "number") {
          const pct = Math.round(progress.progress * 100);
          setDownloadProgress(pct);
          setProgressMessage(`Baixando modelo de voz... (${pct}%)`);
        } else if (progress.status === "ready") {
          setProgressMessage("Inicializando IA...");
        }
      });

      setDeviceMode(device);
      setStatus("ready");
      setProgressMessage("Pronto para leitura.");
      return true;
    } catch (err: any) {
      console.error("Model load error:", err);
      setStatus("error");
      setErrorMessage(
        "Seu navegador não conseguiu carregar o leitor neural local. Tente atualizar o navegador ou utilizar Chrome/Edge."
      );
      return false;
    }
  };

  // Play segment by index
  const playSegment = async (index: number, currentSegments = segments) => {
    let segList = currentSegments;
    if (segList.length === 0) {
      segList = scanDocument();
    }

    if (segList.length === 0) {
      setStatus("error");
      setErrorMessage("Nenhum texto disponível para leitura nesta página.");
      return;
    }

    if (index < 0 || index >= segList.length) {
      // Reached end of text
      stop();
      return;
    }

    const isReady = await ensureModelLoaded();
    if (!isReady) return;

    const segment = segList[index];
    setCurrentIndex(index);
    highlightSegment(segment);

    try {
      setStatus("generating");

      let audioBlob: Blob;

      // Check if prefetched
      if (prefetchBlobRef.current && prefetchBlobRef.current.index === index) {
        audioBlob = prefetchBlobRef.current.blob;
        prefetchBlobRef.current = null;
      } else {
        audioBlob = await KokoroService.generateSegmentAudio(
          segment,
          settings.voice,
          settings.speed
        );
      }

      if (!playerRef.current) return;

      setStatus("playing");
      await playerRef.current.playBlob(audioBlob, settings.speed, settings.volume);

      // Prefetch next segment in background
      const nextIdx = index + 1;
      if (nextIdx < segList.length) {
        KokoroService.generateSegmentAudio(
          segList[nextIdx],
          settings.voice,
          settings.speed
        ).then((blob) => {
          prefetchBlobRef.current = { index: nextIdx, blob };
        }).catch(console.warn);
      }
    } catch (err: any) {
      console.error("Failed to generate/play segment:", err);
      setStatus("error");
      setErrorMessage("Ocorreu um erro ao gerar o áudio deste trecho.");
    }
  };

  // Segment completion handler
  const onSegmentEnded = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (settings.continuous && nextIndex < segments.length) {
        // Continue playing next segment
        setTimeout(() => {
          playSegment(nextIndex);
        }, 100);
        return nextIndex;
      } else {
        // Finish reading
        setStatus("ready");
        highlightSegment(null);
        return prevIndex;
      }
    });
  };

  const play = () => {
    if (status === "paused" && playerRef.current) {
      playerRef.current.resume();
      setStatus("playing");
    } else {
      playSegment(currentIndex);
    }
  };

  const pause = () => {
    if (playerRef.current) {
      playerRef.current.pause();
      setStatus("paused");
    }
  };

  const stop = () => {
    if (playerRef.current) {
      playerRef.current.stop();
    }
    prefetchBlobRef.current = null;
    highlightSegment(null);
    setCurrentIndex(0);
    setCurrentTime(0);
    setDuration(0);
    setStatus("ready");
  };

  const next = () => {
    const nextIdx = currentIndex + 1;
    if (nextIdx < segments.length) {
      playSegment(nextIdx);
    }
  };

  const previous = () => {
    const prevIdx = Math.max(0, currentIndex - 1);
    playSegment(prevIdx);
  };

  const selectVoice = (voiceId: string) => {
    setSettings((prev) => ({ ...prev, voice: voiceId }));
    prefetchBlobRef.current = null;
    if (status === "playing" || status === "paused") {
      setTimeout(() => playSegment(currentIndex), 100);
    }
  };

  const setSpeed = (speed: number) => {
    setSettings((prev) => ({ ...prev, speed }));
    if (playerRef.current) {
      playerRef.current.setSpeed(speed);
    }
  };

  const setVolume = (volume: number) => {
    setSettings((prev) => ({ ...prev, volume }));
    if (playerRef.current) {
      playerRef.current.setVolume(volume);
    }
  };

  const toggleContinuous = () => {
    setSettings((prev) => ({ ...prev, continuous: !prev.continuous }));
  };

  const seek = (seconds: number) => {
    if (playerRef.current) {
      playerRef.current.seek(seconds);
      setCurrentTime(seconds);
    }
  };

  const handleClearCache = async () => {
    await clearAudioCache();
    prefetchBlobRef.current = null;
    alert("Cache de áudios armazenados foi limpo com sucesso.");
  };

  return {
    status,
    deviceMode,
    downloadProgress,
    progressMessage,
    errorMessage,
    settings,
    segments,
    currentIndex,
    currentTime,
    duration,
    availableVoices: AVAILABLE_VOICES,
    play,
    pause,
    stop,
    next,
    previous,
    selectVoice,
    setSpeed,
    setVolume,
    toggleContinuous,
    seek,
    scanDocument,
    handleClearCache,
  };
}
