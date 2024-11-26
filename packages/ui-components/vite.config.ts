import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "ui-components",
      fileName: "index",
    },
    rollupOptions: {
      external: ["solid-js"],
    },
  },
});
