<script setup lang="ts">
import { getCurrentWindow, LogicalSize } from '@tauri-apps/api/window'

defineOptions({
  name: 'TrayMenu'
})

const trayMenu = ref<HTMLElement>()
const currentWindow = getCurrentWindow()
currentWindow.once('tauri://blur', (e) => {
  console.log(e)
  currentWindow.close()
})

onMounted(async () => {
  if (!trayMenu.value) {
    return
  }
  const { clientWidth, clientHeight } = trayMenu.value
  currentWindow.setSize(new LogicalSize(clientWidth, clientHeight))
})
</script>

<template>
  <div class="tray-menu" ref="trayMenu">
    <a-menu>
      <a-menu-item key="1" disabled>
        <template #icon> <IconSetting /> </template>
        设置
      </a-menu-item>
      <a-menu-item disabled>
        <template #icon> <IconLog /> </template>
        操作记录
      </a-menu-item>
      <a-menu-item disabled>
        <template #icon> <IconHelp /> </template>
        帮助
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item disabled>
        <template #icon> <IconLogout /> </template>
        退出
      </a-menu-item>
    </a-menu>
  </div>
</template>

<style lang="less" scoped>
.tray-menu {
}
</style>
