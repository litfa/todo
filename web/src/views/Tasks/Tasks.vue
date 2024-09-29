<script setup lang="ts">
import TaskList from '@/components/TaskList/TaskList.vue'
import AddTask from '@/components/AddTask/AddTask.vue'

defineOptions({
  name: 'TasksPage'
})
</script>

<template>
  <div class="tasks-page">
    <TaskList />
    <AddTask />
  </div>
</template>

<style lang="less" scoped>
.tasks-page {
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 8px;
  box-sizing: border-box;
  .task-list {
    flex: 1;
  }
}
</style>
