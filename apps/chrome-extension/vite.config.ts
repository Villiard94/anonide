import { crx } from "@crxjs/vite-plugin";
import devtools from "solid-devtools/vite";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { join, resolve } from "path";
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
        index: resolve(__dirname, "index.html"),
      },
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
  resolve: {
    alias: [
      {
        find: /@anonide\/(.*)/,
        replacement: join(resolve(__dirname, "../../packages"), "$1", "src"),
      },
    ],
  },
});
