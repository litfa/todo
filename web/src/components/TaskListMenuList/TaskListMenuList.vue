<script setup lang="ts">
// import { useTasksListStore } from '@/stores/index'
import SidebarListItem from './TaskListMenuListItem.vue'
import { defaultList } from '@ltfei/todo-common'
import { todoSdk } from '@/utils/useTodoSdk'

defineOptions({
  name: 'TaskListMenuList'
})

// const taskGroup = useTaskGroupStore()
// const taskList = useTasksListStore()
const router = useRouter()
const route = useRoute()

const items = computed(() => {
  return todoSdk.data.taskList.value.filter((list) => {
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
  <div class="task-list-menu-list">
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
.task-list-menu-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  .divider {
    margin: 4px 0;
  }
}
</style>
