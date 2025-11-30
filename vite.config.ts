import { defineConfig } from "vite";

export default defineConfig({
  base: "/neichler/",
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "esbuild",
  },
  server: {
    port: 3000,
  },
});
