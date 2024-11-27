import { crx } from "@crxjs/vite-plugin";
import devtools from "solid-devtools/vite";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import path from "path";
import manifest from "./manifest.json" assert { type: "json" };

export default defineConfig({
  plugins: [devtools(), solidPlugin(), crx({ manifest })],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
    outDir: "dist",
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
      },
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
  resolve: {
    alias: {
      "@anonide/ui-components": path.resolve(__dirname, "../../packages/ui-components/src"),
      "@anonide/anonymizer": path.resolve(__dirname, "../../packages/anonymizer/src"),
    },
  },
});
