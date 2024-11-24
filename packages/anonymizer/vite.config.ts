import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'anonimizer',
      fileName: 'index',
    },
    sourcemap: true,
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
});
