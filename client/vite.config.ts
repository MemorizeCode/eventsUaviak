import MillionLint from '@million/lint';
import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import { compression } from 'vite-plugin-compression2';

export default defineConfig({
  plugins: [
    MillionLint.vite({ enabled: true }),
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 0,
    }),
    react({
      babel: {
        plugins: [
          ['import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true,
          }],
        ],
      },
    }),
  ],
  optimizeDeps: {
    exclude: [
      '@million/lint',
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    terserOptions: {
      compress: {
        unused: true,
        dead_code: true,
        drop_console: true,
        drop_debugger: true,
      },
    },
    sourcemap: false,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          'antd-core': ['antd/es/button', 'antd/es/input', 'antd/es/typography', 'antd/es/flex'],
          'antd-layout': ['antd/es/layout', 'antd/es/menu', 'antd/es/drawer'],
          'antd-data': ['antd/es/table', 'antd/es/form', 'antd/es/select'],
          'antd-icons': ['@ant-design/icons'],
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
  server: {
    watch: { usePolling: true },
    host: true,
    strictPort: true,
    port: 8080,
  },
});