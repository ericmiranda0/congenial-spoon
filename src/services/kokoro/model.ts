import { KokoroTTS } from "kokoro-js";

// Singleton instance to prevent multiple loadings
let ttsInstance: KokoroTTS | null = null;
let isWebGPUAvailable: boolean | null = null;

export async function detectWebGPU(): Promise<boolean> {
  if (isWebGPUAvailable !== null) {
    return isWebGPUAvailable;
  }
  if (typeof navigator === "undefined" || !("gpu" in navigator)) {
    isWebGPUAvailable = false;
    return false;
  }
  try {
    const adapter = await (navigator as any).gpu.requestAdapter();
    isWebGPUAvailable = !!adapter;
    return isWebGPUAvailable;
  } catch (err) {
    console.warn("WebGPU detection failed, falling back to WASM/CPU:", err);
    isWebGPUAvailable = false;
    return false;
  }
}

export type ModelProgressCallback = (progress: {
  status: string;
  progress?: number;
  file?: string;
}) => void;

/**
 * Loads KokoroTTS model on-demand with progress reporting.
 * Reuses existing instance once loaded.
 */
export async function getOrInitKokoroModel(
  onProgress?: ModelProgressCallback
): Promise<{ model: KokoroTTS; device: "webgpu" | "wasm" }> {
  if (ttsInstance) {
    const hasWebGPU = await detectWebGPU();
    return { model: ttsInstance, device: hasWebGPU ? "webgpu" : "wasm" };
  }

  const hasWebGPU = await detectWebGPU();
  const device = hasWebGPU ? "webgpu" : "wasm";

  const MODEL_ID = "onnx-community/Kokoro-82M-ONNX";

  try {
    const model = await KokoroTTS.from_pretrained(MODEL_ID, {
      dtype: "q8",
      device: device,
      progress_callback: (progressInfo: any) => {
        if (onProgress && progressInfo) {
          onProgress(progressInfo);
        }
      },
    });

    // Patch _validate_voice to support Portuguese & other custom voice keys
    if (model && typeof (model as any)._validate_voice === "function") {
      const origValidate = (model as any)._validate_voice.bind(model);
      (model as any)._validate_voice = (voice: string) => {
        if (voice.startsWith("pf_") || voice.startsWith("pm_")) {
          return "p"; // Portuguese language code for phonemizer
        }
        if (voice.startsWith("ef_") || voice.startsWith("em_")) {
          return "e"; // Spanish
        }
        if (voice.startsWith("ff_")) {
          return "f"; // French
        }
        if (voice.startsWith("if_") || voice.startsWith("im_")) {
          return "i"; // Italian
        }
        if (voice.startsWith("jf_") || voice.startsWith("jm_")) {
          return "j"; // Japanese
        }
        if (voice.startsWith("zf_") || voice.startsWith("zm_")) {
          return "z"; // Chinese
        }
        try {
          return origValidate(voice);
        } catch {
          return voice.charAt(0);
        }
      };
    }

    ttsInstance = model;
    return { model: ttsInstance, device };
  } catch (error) {
    console.error("Failed to load KokoroTTS model with WebGPU, trying WASM fallback:", error);
    if (device === "webgpu") {
      const fallbackModel = await KokoroTTS.from_pretrained(MODEL_ID, {
        dtype: "q8",
        device: "wasm",
        progress_callback: (progressInfo: any) => {
          if (onProgress && progressInfo) {
            onProgress(progressInfo);
          }
        },
      });

      if (fallbackModel && typeof (fallbackModel as any)._validate_voice === "function") {
        const origValidate = (fallbackModel as any)._validate_voice.bind(fallbackModel);
        (fallbackModel as any)._validate_voice = (voice: string) => {
          if (voice.startsWith("pf_") || voice.startsWith("pm_")) return "p";
          try {
            return origValidate(voice);
          } catch {
            return voice.charAt(0);
          }
        };
      }

      ttsInstance = fallbackModel;
      return { model: ttsInstance, device: "wasm" };
    }
    throw error;
  }
}

export function isModelLoaded(): boolean {
  return ttsInstance !== null;
}
