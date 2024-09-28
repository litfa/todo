<script setup lang="ts">
import TaskListItem from './TaskListItem.vue'
import { useTasksStore, useTasksListStore } from '@/stores/'

defineOptions({
  name: 'TaskList'
})

const route = useRoute()
const tasksStore = useTasksStore()
const tasksListStore = useTasksListStore()

const id = computed(() => route.params.id as string)

const taskList = computed(() => {
  return tasksListStore.tasks.find((e) => {
    return e.id == id.value || e.createdWithLocalId == id.value
  })
})
console.log(taskList.value)

const tasks = computed(() => {
  return tasksStore.tasks.filter((task) => {
    return (
      task.parentFolderId == taskList.value?.id ||
      task.parentFolderId == taskList.value?.createdWithLocalId
    )
  })
})
</script>

<template>
  <div class="task-list">
    <TaskListItem v-for="i in tasks" :key="i.id || i.createdWithLocalId" v-bind="i" />
  </div>
</template>

<style lang="less" scoped></style>
