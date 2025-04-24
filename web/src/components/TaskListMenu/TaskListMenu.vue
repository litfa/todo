<script setup lang="ts">
import { openSettingWindow } from '@/components/Setting'
import { injectionKey } from '@/types/'
import { deleteToken } from '@/utils/auth'
import { todoSdk } from '@/utils/useTodoSdk'
import { message, Modal } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import TaskListMenuList from '../TaskListMenuList/TaskListMenuList.vue'
import SidebarFooter from './TaskListMenuFooter.vue'
import TaskListMenuUser from './TaskListMenuUser.vue'
import i18n from '@/lang'

defineOptions({
  name: 'TaskListMenu'
})

withDefaults(
  defineProps<{
    showUser?: boolean
  }>(),
  {
    showUser: true
  }
)

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
  <div class="task-list-menu">
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
      <TaskListMenuUser v-if="showUser" />
    </a-dropdown>

    <div class="search"></div>

    <div class="list">
      <TaskListMenuList />
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
.task-list-menu {
  width: 100%;
  max-width: 200px;
  height: 100%;
  background-color: @bg-color;
  display: flex;
  flex-direction: column;
  border-right: 1px solid @black-opacity-1;
  padding: 16px 8px;
  box-sizing: border-box;
  .list {
    flex: 1;
  }
}
</style>
