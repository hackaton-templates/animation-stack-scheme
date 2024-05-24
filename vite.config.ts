import { defineConfig } from "vite";
import motionCanvas from "@motion-canvas/vite-plugin";
import ffmpeg from "@motion-canvas/ffmpeg";
import path from "path";

export default defineConfig({
  plugins: [
    motionCanvas({
      project: [
        "./src/example-project-1",
        "./src/example-project-2",
        "./src/new-project",
      ],
    }),
    ffmpeg(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./assets"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
});
