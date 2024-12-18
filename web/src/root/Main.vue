<script setup lang="ts">
import { SyncCommitsService } from '@/utils/syncCommitsService'
import { useViewLayerEvent } from '@/utils/useViewLayerEvent'
import { useStoreStorage } from '@/utils/useStorage'
import VConsole from 'vconsole'
import { NotificationService } from '@/utils/notification'
import { useUserSetting } from '@/stores/setting'
import { injectionKey } from '@/types/'

defineOptions({
  name: 'MainRoot'
})

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
  <RouterView />
</template>
