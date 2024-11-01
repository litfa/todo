<script setup lang="ts">
import SidebarUser from './SidebarUser.vue'
import SidebarList from '../SidebarList/SidebarList.vue'
import SidebarFooter from './SidebarFooter.vue'
import { openSettingWindow } from '@/components/Setting'

defineOptions({
  name: 'SideBar'
})

const openSetting = () => {
  openSettingWindow()
}
</script>

<template>
  <div class="sidebar">
    <a-dropdown trigger="click">
      <template #overlay>
        <a-menu>
          <a-menu-item key="1" @click="openSetting">
            <template #icon> <IconSetting /> </template>
            设置
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item disabled>
            <template #icon> <IconLog /> </template>
            操作记录
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item disabled>
            <template #icon> <IconHelp /> </template>
            帮助
          </a-menu-item>
          <a-menu-item disabled>
            <template #icon> <IconDownload /> </template>
            下载客户端
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item disabled>
            <template #icon> <IconLogout /> </template>
            退出登录
          </a-menu-item>
        </a-menu>
      </template>
      <SidebarUser />
    </a-dropdown>

    <div class="search"></div>

    <div class="list">
      <SidebarList />
    </div>

    <div class="footer">
      <SidebarFooter />
    </div>
  </div>
</template>

<style lang="less" scoped>
.i-icon {
  display: flex;
}
.sidebar {
  width: 100%;
  max-width: 200px;
  height: 100%;
  background-color: @bg-color;
  display: flex;
  flex-direction: column;
  .list {
    flex: 1;
  }
}
</style>
