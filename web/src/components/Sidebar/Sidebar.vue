<script setup lang="ts">
import { openSettingWindow } from '@/components/Setting'
import { injectionKey } from '@/types/'
import { deleteToken } from '@/utils/auth'
import { todoSdk } from '@/utils/useTodoSdk'
import { message, Modal } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import SidebarList from '../SidebarList/SidebarList.vue'
import SidebarFooter from './SidebarFooter.vue'
import SidebarUser from './SidebarUser.vue'
import i18n from '@/lang'

defineOptions({
  name: 'SideBar'
})

const { t } = i18n.global
const closeMenu = inject(injectionKey.closeMenu)
const router = useRouter()

const openSetting = () => {
  openSettingWindow()
}

const onSyncCommits = async () => {
  // syncCommits && (await syncCommits())
  todoSdk.syncService.sync()
  message.success('已同步')
  closeMenu && closeMenu()
}

const logout = () => {
  Modal.confirm({
    title: '确定要退出登录吗？',
    onOk() {
      deleteToken()
      router.push('/login')
    }
  })
}
</script>

<template>
  <div class="sidebar">
    <a-dropdown trigger="click">
      <template #overlay>
        <a-menu>
          <a-menu-item key="1" @click="openSetting">
            <template #icon> <IconSetting /> </template>
            {{ t('setting') }}
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item @click="onSyncCommits">
            <template #icon> <IconRefresh /> </template>
            {{ t('synchronize_now') }}
          </a-menu-item>
          <a-menu-item disabled>
            <template #icon> <IconLog /> </template>
            {{ t('operation_record') }}
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item disabled>
            <template #icon> <IconHelp /> </template>
            {{ t('help') }}
          </a-menu-item>
          <a-menu-item disabled>
            <template #icon> <IconDownload /> </template>
            下载客户端
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item @click="logout">
            <template #icon> <IconLogout /> </template>
            {{ t('logout') }}
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
