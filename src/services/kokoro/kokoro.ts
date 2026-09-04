import { getOrInitKokoroModel } from "./model";
import {
  rawAudioToWavBlob,
  getCachedAudio,
  setCachedAudio,
  generateCacheKey,
} from "./audio";

export interface TextSegment {
  id: string;
  text: string;
  ttsText: string;
  element?: HTMLElement | null;
}

export interface VoiceOption {
  id: string;
  name: string;
  lang: string;
  flag: string;
  gender: string;
}

export const AVAILABLE_VOICES: VoiceOption[] = [
  {
    id: "pf_dora",
    name: "Português — Feminina",
    lang: "pt-BR",
    flag: "🇧🇷",
    gender: "Feminina",
  },
  {
    id: "pm_alex",
    name: "Português — Masculina",
    lang: "pt-BR",
    flag: "🇧🇷",
    gender: "Masculina",
  },
  {
    id: "pm_santa",
    name: "Português — Masculina (Voz 2)",
    lang: "pt-BR",
    flag: "🇧🇷",
    gender: "Masculina",
  },
  {
    id: "af_heart",
    name: "English — Heart (Female)",
    lang: "en-US",
    flag: "🇺🇸",
    gender: "Female",
  },
  {
    id: "af_bella",
    name: "English — Bella (Female)",
    lang: "en-US",
    flag: "🇺🇸",
    gender: "Female",
  },
  {
    id: "am_eric",
    name: "English — Eric (Male)",
    lang: "en-US",
    flag: "🇺🇸",
    gender: "Male",
  },
];

/* ==========================================================================
   Configurable Legal Pronunciation Dictionary
   ========================================================================== */

export const pronunciationDictionary: Record<string, string> = {
  "Art.": "Artigo",
  "art.": "artigo",
  "Arts.": "Artigos",
  "arts.": "artigos",
  "§": "Parágrafo",
  "§§": "Parágrafos",
  "pú.": "parágrafo único",
  "Pú.": "Parágrafo único",
  "inc.": "Inciso",
  "nº": "número",
  "Nº": "Número",
  "n.º": "número",
  "CF": "Constituição Federal",
  "CC": "Código Civil",
  "CP": "Código Penal",
  "CPC": "Código de Processo Civil",
  "CPP": "Código de Processo Penal",
  "STF": "Supremo Tribunal Federal",
  "STJ": "Superior Tribunal de Justiça",
  "CLT": "Consolidação das Leis do Trabalho",
  "OAB": "Ordem dos Advogados do Brasil",
  "ECA": "Estatuto da Criança e do Adolescente",
  "CTN": "Código Tributário Nacional",
  "CDC": "Código de Defesa do Consumidor",
  "LGPD": "Lei Geral de Proteção de Dados",
};

const ORDINALS_PT: Record<string, string> = {
  "1": "primeiro",
  "2": "segundo",
  "3": "terceiro",
  "4": "quarto",
  "5": "quinto",
  "6": "sexto",
  "7": "sétimo",
  "8": "oitavo",
  "9": "nono",
};

const ROMAN_NUMERALS_MAP: Record<string, string> = {
  I: "um",
  II: "dois",
  III: "três",
  IV: "quatro",
  V: "cinco",
  VI: "seis",
  VII: "sete",
  VIII: "oito",
  IX: "nove",
  X: "dez",
};

/**
 * Preprocesses legal text specifically for TTS synthesis.
 * Does NOT modify screen text.
 */
export function preprocessLegalText(text: string): string {
  if (!text) return "";

  let processed = text;

  // Replace Art. Xº / Art. X
  processed = processed.replace(/\bArt(?:igo)?\.\s*(\d+)º?\b/gi, (_, numStr) => {
    const num = parseInt(numStr, 10);
    if (num >= 1 && num <= 9) {
      return `Artigo ${ORDINALS_PT[numStr]}`;
    }
    return `Artigo ${numStr}`;
  });

  // Replace § Xº / § X
  processed = processed.replace(/§\s*(\d+)º?\b/g, (_, numStr) => {
    const num = parseInt(numStr, 10);
    if (num >= 1 && num <= 9) {
      return `Parágrafo ${ORDINALS_PT[numStr]}`;
    }
    return `Parágrafo ${numStr}`;
  });

  // Replace Parágrafo único
  processed = processed.replace(/\bParágrafo único\b/gi, "Parágrafo único");

  // Replace Incisos I -, II -, III -, etc. at line/sentence start
  processed = processed.replace(/\b(I|II|III|IV|V|VI|VII|VIII|IX|X)\s*[-–—]\s*/g, (match, roman) => {
    const word = ROMAN_NUMERALS_MAP[roman.toUpperCase()];
    return word ? `Inciso ${word}: ` : match;
  });

  // Replace words using pronunciationDictionary
  for (const [key, replacement] of Object.entries(pronunciationDictionary)) {
    if (key.endsWith(".")) {
      const regexKey = key.replace(".", "\\.");
      const regex = new RegExp(`\\b${regexKey}`, "g");
      processed = processed.replace(regex, replacement);
    } else if (key === "§" || key === "§§") {
      const regex = new RegExp(key, "g");
      processed = processed.replace(regex, replacement);
    } else {
      const regex = new RegExp(`\\b${key}\\b`, "g");
      processed = processed.replace(regex, replacement);
    }
  }

  // Clean extra whitespace
  return processed.replace(/\s+/g, " ").trim();
}

/**
 * Intelligent segmentation of legal document container into TextSegments.
 */
export function segmentLegalContent(container?: HTMLElement | null): TextSegment[] {
  const root = container || document.querySelector("main") || document.body;
  if (!root) return [];

  const segments: TextSegment[] = [];

  const elements = Array.from(
    root.querySelectorAll<HTMLElement>(
      "h1, h2, h3, h4, p, li, summary, .quick-review li, .summary-card, blockquote"
    )
  );

  let index = 0;
  for (const el of elements) {
    if (el.closest(".tts-player-container") || el.offsetParent === null) {
      continue;
    }

    const rawText = el.innerText.trim();
    if (!rawText || rawText.length < 3) continue;

    const parts = rawText.split(/(?<=[.!?])\s+(?=[A-Z0-9Art§I-]+)/g);

    for (const part of parts) {
      const cleaned = part.trim();
      if (cleaned.length < 3) continue;

      const segId = `tts-seg-${index++}`;
      
      if (!el.id) {
        el.id = segId;
      }

      segments.push({
        id: segId,
        text: cleaned,
        ttsText: preprocessLegalText(cleaned),
        element: el,
      });
    }
  }

  return segments;
}

/**
 * High-level Kokoro Service object.
 */
export class KokoroService {
  /**
   * Generates audio for a single TextSegment.
   * Leverages IndexedDB cache and KokoroTTS model.
   */
  public static async generateSegmentAudio(
    segment: TextSegment,
    voice: string = "pf_dora",
    speed: number = 1.0,
    onProgress?: (percent: number, msg: string) => void
  ): Promise<Blob> {
    const cacheKey = generateCacheKey(voice, speed, segment.ttsText);

    // 1. Check IndexedDB Cache
    const cached = await getCachedAudio(cacheKey);
    if (cached) {
      return cached;
    }

    // 2. Load / Get Model Instance
    const { model } = await getOrInitKokoroModel((progressInfo) => {
      if (onProgress && progressInfo) {
        const percent = Math.round((progressInfo.progress || 0) * 100);
        onProgress(percent, progressInfo.file ? `Baixando ${progressInfo.file}...` : "Carregando IA...");
      }
    });

    // 3. Generate Raw Audio using KokoroTTS
    const rawAudio = await model.generate(segment.ttsText, {
      voice: voice as any,
      speed: speed,
    });

    // 4. Convert Raw Audio to WAV Blob
    let wavBlob: Blob;
    if (typeof (rawAudio as any).toBlob === "function") {
      wavBlob = (rawAudio as any).toBlob();
    } else {
      const pcmData = (rawAudio as any).data || (rawAudio as any).audio;
      wavBlob = rawAudioToWavBlob(
        pcmData instanceof Float32Array ? pcmData : pcmData[0],
        rawAudio.sampling_rate || 24000
      );
    }

    // 5. Store in IndexedDB Cache asynchronously
    setCachedAudio(cacheKey, wavBlob).catch(console.warn);

    return wavBlob;
  }
}
