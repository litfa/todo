<script setup lang="ts">
import TaskListItem from '../TaskList/TaskListItem.vue'
import { useTasksStore, useTasksListStore } from '@/stores/'
import Editor from './Editor.vue'

defineOptions({
  name: 'TaskDrawer'
})

const open = ref(true)

const tasksStore = useTasksStore()
</script>

<template>
  <div class="task-drawer" :class="{ open }">
    <Editor />
  </div>
</template>

<style lang="less" scoped>
.task-drawer {
  width: 0;
  overflow: hidden;
  &.open {
    width: 300px;
  }
}
</style>
