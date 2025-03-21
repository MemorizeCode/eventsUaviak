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
    sourcemap: false,
    chunkSizeWarningLimit: 700,
  },
  server: {
    watch: {
     usePolling: true,
    },
    host: true, 
    strictPort: true,
    port: 8080, 
  }
})
