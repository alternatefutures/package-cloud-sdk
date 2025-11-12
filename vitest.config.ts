import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    coverage: {
      include: ['src/**'],
      all: true,
      reporter: ['text', 'json-summary'],
    },
    snapshotFormat: {
      printBasicPrototype: true,
    },
    setupFiles: ['vitest.setup.ts'],
    clearMocks: true,
  },
  resolve: {
    alias: {
      '@mocks': path.resolve(__dirname, './src/mocks')
    },
  },
});
