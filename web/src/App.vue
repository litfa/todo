<script setup lang="ts">
import { SyncCommitsService } from '@/utils/syncCommitsService'
import { useViewLayerEvent } from '@/utils/useViewLayerEvent'
import { useThemes } from '@/utils/theme'
import themes from '@/assets/theme'
import { useStoreStorage } from '@/utils/useStorage'

const syncCommitsService = new SyncCommitsService()

const startService = async () => {
  await useStoreStorage()
  syncCommitsService.startSync(1000 * 10)
}
startService()

const { theme, mode } = useThemes(themes)

provide('themeMode', mode)

onMounted(() => {
  useViewLayerEvent()
})

onUnmounted(() => {
  syncCommitsService.destroy()
})
</script>

<template>
  <!-- <button @click="syncCommitsService.sync()">sync</button> -->
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: theme.primary
      }
    }"
  >
    <RouterView />
  </a-config-provider>
</template>

<style lang="less" scoped></style>
