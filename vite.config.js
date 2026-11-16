import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    // Global CSS has overlapping class names; a single stylesheet keeps the
    // cascade order identical no matter which lazy page is opened first.
    cssCodeSplit: false,
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
});
