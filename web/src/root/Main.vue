<script setup lang="ts">
import { useUserStore } from '@/stores'
import { useUserSetting } from '@/stores/setting'
import { NotificationService } from '@/utils/notification'
import { isDesktop } from '@/utils/os'
import { TrayService } from '@/utils/tray'
import { useStoreStorage } from '@/utils/useStorage'
import { todoSdk } from '@/utils/useTodoSdk'
import { useViewLayerEvent } from '@/utils/useViewLayerEvent'
import VConsole from 'vconsole'

defineOptions({
  name: 'MainRoot'
})

const setting = useUserSetting()
const user = useUserStore()

const notificationService = new NotificationService()

const startService = async () => {
  await useStoreStorage()
  await user.getUserInfo()
  if (setting.getSettingItem('dev', 'vConsole').value == '1') {
    new VConsole()
  }
  todoSdk.syncService.startSync(1000 * 10)

  notificationService.startNotificationProcessing()

  if (isDesktop()) {
    new TrayService()
  }
}
startService()

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
