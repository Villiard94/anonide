import { crx } from "@crxjs/vite-plugin";
import suidPlugin from "@suid/vite-plugin";
import devtools from "solid-devtools/vite";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import manifest from "./manifest.json";

export default defineConfig({
  plugins: [devtools(), suidPlugin(), solidPlugin(), crx({ manifest })],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
    cssCodeSplit: true,
  },
  css: {
    modules: {
      // Ensure consistent naming for CSS modules
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
  optimizeDeps: {
    include: ["@anonide/ui-components"],
  },
});
