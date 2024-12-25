<script setup lang="ts">
import { getCurrentWindow, LogicalSize } from '@tauri-apps/api/window'
import { useTrayMenu } from './useTrayMenu'

defineOptions({
  name: 'TrayMenu'
})

const trayMenu = ref<HTMLElement>()
const currentWindow = getCurrentWindow()
currentWindow.listen('tauri://blur', () => {
  currentWindow.hide()
})

onMounted(() => {
  if (!trayMenu.value) {
    return
  }
  const { clientWidth, clientHeight } = trayMenu.value
  currentWindow.setSize(new LogicalSize(clientWidth, clientHeight))
})

const { exitApp, openSetting } = useTrayMenu()
</script>

<template>
  <div class="tray-menu" ref="trayMenu">
    <a-menu :selectable="false">
      <a-menu-item @click="openSetting">
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
      <a-menu-item @click="exitApp">
        <template #icon> <IconLogout /> </template>
        退出
      </a-menu-item>
    </a-menu>
  </div>
</template>

<style lang="less" scoped>
.tray-menu {
  max-width: 150px;
}
</style>
