import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://localhost:44315",
        changeOrigin: true,
        secure: false,
      },
      "/apidemande": {
        target: "https://localhost:44332",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/apidemande/, ""),
      },
    },
  },
});