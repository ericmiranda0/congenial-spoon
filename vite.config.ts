import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    lib: {
      entry: path.resolve(__dirname, "src/main.tsx"),
      name: "TextToSpeech",
      fileName: (format) => `tts-bundle.${format}.js`,
      formats: ["es", "iife"],
    },
    target: "esnext",
  },
});
