import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    port: 3000,
    open: true, //自动打开
    base: "./ ", //生产环境路径
    proxy:{
      '^/api': {
          target: 'http://localhost:4000/api', // 后端服务实际地址
          changeOrigin: true, //开启代理
          rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }

})
