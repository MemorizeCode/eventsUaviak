import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react';
import { compression } from 'vite-plugin-compression2'
// https://vite.dev/config/
export default defineConfig({
  plugins: [compression(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    }
  },
  build: {
    sourcemap: false, // Отключить генерацию sourcemaps для уменьшения размера бандла, если не нужен дебаг
    chunkSizeWarningLimit: 700, // Увеличьте этот лимит, если хотите уменьшить предупреждения при сборке
  },
})
