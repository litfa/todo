<script setup lang="ts">
import { useTasksListStore } from '@/stores/index'
import SidebarListItem from './SidebarListItem.vue'
import { defaultList } from '@ltfei/todo-common'

defineOptions({
  name: 'SidebarList'
})

// const taskGroup = useTaskGroupStore()
const taskList = useTasksListStore()
const router = useRouter()
const route = useRoute()

const items = computed(() => {
  return taskList.taskList.filter((list) => {
    return !list.parentFolderGroupId
  })
})

// const selectedKeys = ref<string[]>(['1'])
const openKeys = computed(() => route.params.id as string)

const handleClick = (id: string) => {
  router.push(`/tasks/${id}`)
}
</script>

<template>
  <div class="sidebar-list">
    <SidebarListItem
      v-for="i in defaultList"
      :key="i"
      :name="$t(i)"
      :id="i"
      @click="handleClick(i)"
      :checked="openKeys == i"
    />
    <a-divider class="divider" />

    <SidebarListItem
      v-for="i in items"
      :key="i.id"
      :name="i.name"
      :id="i.id"
      @click="handleClick(i.id)"
      :checked="openKeys == i.id"
    />
    <!-- <SidebarListGroup /> -->
  </div>
</template>

<style lang="less" scoped>
.sidebar-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  .divider {
    margin: 4px 0;
  }
}
</style>
