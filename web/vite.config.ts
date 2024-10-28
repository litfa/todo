import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

import { lessAdditionalData } from './src/utils/theme'
import { ComponentResolver } from 'unplugin-vue-components/types'

const IconParkResovle: ComponentResolver = (componentName) => {
  if (componentName.startsWith('Icon')) {
    return { name: componentName.slice(4), from: '@icon-park/vue-next' }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-import.d.ts',
      resolvers: [AntDesignVueResolver(), IconParkResovle]
    }),
    Components({
      resolvers: [AntDesignVueResolver({ importStyle: false, resolveIcons: true }), IconParkResovle]
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
