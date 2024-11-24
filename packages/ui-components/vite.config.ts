import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    lib: {
      entry: 'src/index.ts',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['solid-js'],
      output: {
        preserveModules: true,
      },
    },
    cssCodeSplit: true,
    // Ensure CSS is processed and included
    cssMinify: true,
    watch: {
      // Enable proper HMR watching
      buildDelay: 100,
    },
  },
  css: {
    modules: {
      // Ensure consistent naming for CSS modules
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
  },
});
