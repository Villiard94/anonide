import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["solid-js"],
    },
    cssCodeSplit: true,
    // Ensure CSS is processed and included
    cssMinify: true,
  },
  css: {
    modules: {
      // Ensure consistent naming for CSS modules
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
});
