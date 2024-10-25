import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

import { lessAdditionalData } from './src/utils/theme'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-import.d.ts',
      resolvers: [AntDesignVueResolver()]
    }),
    Components({
      resolvers: [AntDesignVueResolver({ importStyle: false, resolveIcons: true })]
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        additionalData: lessAdditionalData()
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
