<script setup lang="ts">
// import { SyncCommitsService } from '@/utils/syncCommitsService'
import { useViewLayerEvent } from '@/utils/useViewLayerEvent'
import { useStoreStorage } from '@/utils/useStorage'
import VConsole from 'vconsole'
import { NotificationService } from '@/utils/notification'
import { useUserSetting } from '@/stores/setting'
import { injectionKey } from '@/types/'
import { TrayService } from '@/utils/tray'
import { isDesktop } from '@/utils/os'
import { useUserStore } from '@/stores'
import { todoSdk } from '@/utils/useTodoSdk'

defineOptions({
  name: 'MainRoot'
})

const setting = useUserSetting()
const user = useUserStore()

// const syncCommitsService = new SyncCommitsService()
const notificationService = new NotificationService()

const startService = async () => {
  await useStoreStorage()
  await user.getUserInfo()
  if (setting.getSettingItem('dev', 'vConsole').value == '1') {
    new VConsole()
  }
  // syncCommitsService.startSync(1000 * 10)
  todoSdk.syncService.startSync(1000 * 10)
  notificationService.startNotificationProcessing()

  if (isDesktop()) {
    new TrayService()
  }
}
startService()

// provide(injectionKey.syncCommits, todoSdk.syncService.sync.bind(todoSdk.syncService))

onMounted(() => {
  useViewLayerEvent()
})

onUnmounted(() => {
  todoSdk.syncService.destroy()
  notificationService.destroy()
})
</script>

<template>
  <RouterView />
</template>
