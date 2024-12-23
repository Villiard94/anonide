import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "anonimizer",
      fileName: "index",
    },
    sourcemap: true,
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
  resolve: {
    alias: {
      "@anonide/browser-storage": path.resolve(__dirname, "../browser-storage/src"),
      "@anonide/local-storage": path.resolve(__dirname, "../local-storage/src"),
    },
  },
});
