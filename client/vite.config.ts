import MillionLint from '@million/lint';
import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react';
import { compression } from 'vite-plugin-compression2'
// https://vite.dev/config/
export default defineConfig({
  plugins: [MillionLint.vite({
    enabled: true
  }),
  compression({
    algorithm: 'brotliCompress',
    exclude: [/\.(br)$/, /\.(gz)$/],
    threshold: 0
  }), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    terserOptions: {
      compress: {
        unused: true,
        dead_code: true,
        drop_console: true,
        drop_debugger: true
      }
    },
    sourcemap: false,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          antd: ['antd', '@ant-design/icons'],
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
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
