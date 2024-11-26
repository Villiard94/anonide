import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import suidPlugin from "@suid/vite-plugin";

export default defineConfig({
  plugins: [suidPlugin(), solidPlugin()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "UIComponents",
      fileName: (format) => `ui-components.${format}.js`,
    },
    rollupOptions: {
      external: ["solid-js", "@suid/material", "@suid/icons-material"],
      output: {
        globals: {
          "solid-js": "solid",
          "@suid/material": "suidMaterial",
          "@suid/icons-material": "suidIconsMaterial",
        },
      },
    },
  },
});
