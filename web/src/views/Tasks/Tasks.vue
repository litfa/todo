<script setup lang="ts">
import TaskList from '@/components/TaskList/TaskList.vue'
import AddTask from '@/components/AddTask/AddTask.vue'
import TaskDrawer from '@/components/TaskDrawer/TaskDrawer.vue'
import type { Expose } from '@/components/TaskDrawer/TaskDrawer.vue'

defineOptions({
  name: 'TasksPage'
})

const taskDrawerRef = ref<Expose>()

const clickTaskItem = (id: string) => {
  if (!taskDrawerRef.value) {
    return
  }
  taskDrawerRef.value.openTaskDrawer(id)
}
</script>

<template>
  <div class="tasks-page">
    <div class="list">
      <TaskList @click-task-item="clickTaskItem" />
      <AddTask />
    </div>
    <div class="drawer">
      <TaskDrawer ref="taskDrawerRef" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.tasks-page {
  height: 100%;
  display: flex;
  padding: 8px;
  box-sizing: border-box;
  .list {
    flex: 1;
    display: flex;
    flex-direction: column;
    .task-list {
      flex: 1;
    }
  }
}
</style>
