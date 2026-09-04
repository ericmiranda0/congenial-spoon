import React, { useState, useEffect } from "react";
import { useTextToSpeech } from "./useTextToSpeech";

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds) || !Number.isFinite(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const mm = mins < 10 ? `0${mins}` : `${mins}`;
  const ss = secs < 10 ? `0${secs}` : `${secs}`;
  return `${mm}:${ss}`;
}

export interface TextToSpeechProps {
  containerRef?: React.RefObject<HTMLElement | null>;
  initiallyOpen?: boolean;
}

export const TextToSpeech: React.FC<TextToSpeechProps> = ({
  containerRef,
  initiallyOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  const {
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
    availableVoices,
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
    handleClearCache,
  } = useTextToSpeech(containerRef);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle play/pause with Space when player card is focused or alt+p
      if ((e.altKey && e.key.toLowerCase() === "p")) {
        e.preventDefault();
        if (status === "playing") pause();
        else play();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [status, play, pause]);

  const speedOptions = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];

  if (!isOpen) {
    return (
      <div className="tts-widget-container">
        <button
          className="tts-trigger-btn"
          onClick={() => setIsOpen(true)}
          aria-label="Abrir Leitor de Voz Neural"
          title="Ouvir este resumo com voz IA local"
        >
          <span>🔊</span>
          <span>Leitor de Voz</span>
        </button>
      </div>
    );
  }

  return (
    <div className="tts-widget-container">
      <div
        className="tts-player-card"
        role="region"
        aria-label="Leitor de Voz Neural"
      >
        {/* Header */}
        <div className="tts-header">
          <div className="tts-title-area">
            <h3 className="tts-title">
              <span>🔊</span> Leitor de Voz
            </h3>
            <span
              className="tts-badge-device"
              title={
                deviceMode === "webgpu"
                  ? "Executando via WebGPU (alta performance)"
                  : "Executando via WASM/CPU (modo compatibilidade)"
              }
            >
              {deviceMode === "webgpu"
                ? "⚡ WebGPU ativado"
                : "💻 Modo compatibilidade"}
            </span>
          </div>

          <button
            className="tts-close-btn"
            onClick={() => {
              stop();
              setIsOpen(false);
            }}
            aria-label="Minimizar leitor de voz"
            title="Minimizar"
          >
            &times;
          </button>
        </div>

        {/* First time model load progress */}
        {status === "loading" && (
          <div className="tts-loading-box" aria-live="polite">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{progressMessage || "Preparando leitor..."}</span>
              <span>{downloadProgress}%</span>
            </div>
            <div className="tts-progress-bar-container">
              <div
                className="tts-progress-bar-fill"
                style={{ width: `${downloadProgress}%` }}
              />
            </div>
            <span style={{ fontSize: "0.75rem", opacity: 0.8 }}>
              Isso pode levar alguns segundos na primeira utilização. O modelo
              será armazenado localmente para futuras leituras.
            </span>
          </div>
        )}

        {/* Error message */}
        {status === "error" && (
          <div className="tts-error-box" role="alert">
            ❌ {errorMessage || "Ocorreu um erro ao carregar a voz."}
          </div>
        )}

        {/* Audio controls */}
        <div className="tts-controls-row">
          <button
            className="tts-ctrl-btn"
            onClick={previous}
            disabled={currentIndex === 0 || status === "loading"}
            aria-label="Anterior"
            title="Ir para o trecho anterior"
          >
            ◀
          </button>

          {status === "playing" ? (
            <button
              className="tts-ctrl-btn tts-play-btn"
              onClick={pause}
              aria-label="Pausar leitura"
              title="Pausar"
            >
              ⏸
            </button>
          ) : (
            <button
              className="tts-ctrl-btn tts-play-btn"
              onClick={play}
              disabled={status === "loading"}
              aria-label={status === "paused" ? "Continuar leitura" : "Reproduzir texto"}
              title={status === "paused" ? "Continuar" : "Reproduzir"}
            >
              ▶
            </button>
          )}

          <button
            className="tts-ctrl-btn"
            onClick={next}
            disabled={
              segments.length === 0 ||
              currentIndex >= segments.length - 1 ||
              status === "loading"
            }
            aria-label="Próximo"
            title="Ir para o próximo trecho"
          >
            ▶
          </button>

          <button
            className="tts-ctrl-btn"
            onClick={stop}
            disabled={status === "idle" || status === "loading"}
            aria-label="Parar leitura"
            title="Parar"
          >
            ⏹
          </button>
        </div>

        {/* Timeline & Duration */}
        <div className="tts-timeline">
          <input
            type="range"
            className="tts-slider"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={(e) => seek(parseFloat(e.target.value))}
            aria-label="Barra de progresso do áudio"
            disabled={status !== "playing" && status !== "paused"}
          />
          <div className="tts-time-display">
            <span>{formatTime(currentTime)}</span>
            <span>
              {segments.length > 0
                ? `Trecho ${currentIndex + 1} de ${segments.length}`
                : "Sem texto"}
            </span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="tts-settings-grid">
          <div className="tts-field-group">
            <label htmlFor="ttsVoiceSelect">Voz:</label>
            <select
              id="ttsVoiceSelect"
              className="tts-select"
              value={settings.voice}
              onChange={(e) => selectVoice(e.target.value)}
              aria-label="Selecionar voz"
            >
              {availableVoices.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.flag} {v.name}
                </option>
              ))}
            </select>
          </div>

          <div className="tts-field-group">
            <label htmlFor="ttsSpeedSelect">Velocidade:</label>
            <select
              id="ttsSpeedSelect"
              className="tts-select"
              value={settings.speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              aria-label="Selecionar velocidade de reprodução"
            >
              {speedOptions.map((spd) => (
                <option key={spd} value={spd}>
                  {spd.toFixed(2).replace(".00", ".0")}x
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Checkbox for Continuous Reading */}
        <label className="tts-checkbox-label">
          <input
            type="checkbox"
            checked={settings.continuous}
            onChange={toggleContinuous}
          />
          <span>Reprodução contínua</span>
        </label>

        {/* Volume slider */}
        <div className="tts-field-group" style={{ marginTop: "0.2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label htmlFor="ttsVolume">Volume:</label>
            <span style={{ fontSize: "0.75rem", opacity: 0.7 }}>
              {Math.round(settings.volume * 100)}%
            </span>
          </div>
          <input
            id="ttsVolume"
            type="range"
            className="tts-slider"
            min={0}
            max={1}
            step={0.05}
            value={settings.volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            aria-label="Ajustar volume"
          />
        </div>

        {/* Footer & Privacy Notice */}
        <div className="tts-footer">
          <span>🔒 Processado 100% no seu navegador</span>
          <button
            className="tts-clear-btn"
            onClick={handleClearCache}
            title="Limpar áudios pré-gerados salvos no navegador"
          >
            Limpar cache
          </button>
        </div>
      </div>
    </div>
  );
};
