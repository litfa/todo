<script setup lang="ts">
import type { MenuProps, ItemType } from 'ant-design-vue'
import { useTaskGroupStore, useTasksListStore } from '@/stores/index'

defineOptions({
  name: 'SidebarList'
})

const taskGroup = useTaskGroupStore()
const taskList = useTasksListStore()
const router = useRouter()

const items = computed(() => {
  return taskList.tasks
    .filter((list) => {
      return !list.parentFolderGroupId
    })
    .map((list) => {
      return {
        key: list.id || list.createdWithLocalId,
        label: list.name
      }
    })
})

const selectedKeys = ref<string[]>(['1'])
const openKeys = ref<string[]>(['sub1'])

const handleClick: MenuProps['onClick'] = (e) => {
  router.push(`/tasks/${e.key}`)
}
</script>

<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    :items="items"
    @click="handleClick"
  ></a-menu>
</template>

<style lang="less" scoped></style>
