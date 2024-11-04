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

const host = process.env.TAURI_DEV_HOST

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
  },
  server: {
    port: 5173,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: 5174
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**']
    }
  }
})
