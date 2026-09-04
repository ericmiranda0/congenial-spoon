import React from "react";
import ReactDOM from "react-dom/client";
import { TextToSpeech } from "./components/TextToSpeech/TextToSpeech";
// @ts-ignore
import ttsStyles from "./components/TextToSpeech/TextToSpeech.css?inline";

function injectStyles() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("tts-styles")) {
    const styleTag = document.createElement("style");
    styleTag.id = "tts-styles";
    styleTag.textContent = ttsStyles as string;
    document.head.appendChild(styleTag);
  }
}

function autoMountTextToSpeech() {
  if (typeof document === "undefined") return;

  injectStyles();

  let rootContainer = document.getElementById("tts-root");
  if (!rootContainer) {
    rootContainer = document.createElement("div");
    rootContainer.id = "tts-root";
    document.body.appendChild(rootContainer);
  }

  const root = ReactDOM.createRoot(rootContainer);
  root.render(
    <React.StrictMode>
      <TextToSpeech />
    </React.StrictMode>
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", autoMountTextToSpeech);
} else {
  autoMountTextToSpeech();
}

(window as any).initTextToSpeech = autoMountTextToSpeech;
