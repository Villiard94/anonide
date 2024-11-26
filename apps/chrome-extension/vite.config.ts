import { crx } from "@crxjs/vite-plugin";
import suidPlugin from "@suid/vite-plugin";
import devtools from "solid-devtools/vite";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import path from "path";
import manifest from "./manifest.json";

export default defineConfig({
  plugins: [devtools(), suidPlugin(), solidPlugin(), crx({ manifest })],
  server: {
    port: 3000,
    watch: {
      // Force Vite to watch workspace packages
      ignored: ["!**/node_modules/@anonide/**"],
    },
  },
  build: {
    target: "esnext",
    cssCodeSplit: true,
  },
  css: {
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
  resolve: {
    // Ensure workspace packages are properly resolved
    alias: {
      "@anonide/ui-components": path.resolve(__dirname, "../../packages/ui-components/src"),
      "@anonide/anonymizer": path.resolve(__dirname, "../../packages/anonymizer/src"),
    },
  },
  optimizeDeps: {
    include: ["@anonide/ui-components", "@anonide/anonymizer"],
    // Force Vite to process workspace dependencies
    force: true,
  },
});
