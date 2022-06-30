import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import stylelintPlugin from '@frsource/vite-plugin-stylelint';
import { createHtmlPlugin } from 'vite-plugin-html';

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8064,
    proxy: {
      '/api': {
        target: 'http://192.168.20.73:8001', // 开发环境
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [
    vue(),
    eslintPlugin({
      cache: false,
    }),
    stylelintPlugin({
      throwOnError: false,
      fix: true,
    }),
    createHtmlPlugin({
      inject: {
        data: {
          answers: '',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
