import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import viteCompression from 'vite-plugin-compression'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  css: {
    postcss: {
      plugins: [require('autoprefixer')()]
    }
  },
  plugins: [
    vue(),
    // ElementPlus按需加载
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // gzip压缩
    viteCompression()
  ],
  server: {
    host: 'localhost',
    port: 3001,
    open: true,
    // 配置代理服务器，解决跨域
    proxy: {
      '/api': {
        // target: 'http://localhost:3002',
        target: 'http://1.15.112.209:5000',
        changeOrigin: true
      }
    }
  },
  resolve: {
    // 配置别名
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
