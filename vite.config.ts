import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
export default defineConfig({
  root: 'apps/lab',
  base: process.env.SITE_BASE_PATH || './',
  resolve: { alias: { '@': fileURLToPath(new URL('.', import.meta.url)) } },
  plugins: [react(), tailwindcss()],
  build: { outDir: '../../dist', emptyOutDir: true },
});
