<script setup lang="ts">
import { SyncCommitsService } from '@/utils/syncCommitsService'
import { useViewLayerEvent } from '@/utils/useViewLayerEvent'
import { useThemes } from '@/utils/theme'
import themes from '@/assets/theme'
import { useStoreStorage } from '@/utils/useStorage'
import VConsole from 'vconsole'
import { NotificationService } from '@/utils/notification'
import { injectionKey } from '@/types/'
import { useUserSetting } from '@/stores/setting'

const setting = useUserSetting()

const syncCommitsService = new SyncCommitsService()
const notificationService = new NotificationService()

const startService = async () => {
  await useStoreStorage()
  if (setting.getSettingItem('dev', 'vConsole').value == '1') {
    new VConsole()
  }
  syncCommitsService.startSync(1000 * 10)
  notificationService.startNotificationProcessing()
}
startService()

const { theme, mode } = useThemes(themes)

provide(injectionKey.themeMode, mode)
provide(injectionKey.syncCommits, syncCommitsService.sync.bind(syncCommitsService))

onMounted(() => {
  useViewLayerEvent()
})

onUnmounted(() => {
  syncCommitsService.destroy()
  notificationService.destroy()
})
</script>

<template>
  <!-- <button @click="syncCommitsService.sync()">sync</button> -->
  <!-- <button
    @click="
      notificationService.createTauriNotificationWindow({
        id: 'p00dnrafdqtd',
        time: 0,
        title: ''
      })
    "
    v-if="$route.path != '/notification'"
  >
    open notification
  </button> -->
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
