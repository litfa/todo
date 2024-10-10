<script setup lang="ts">
import TaskList from '@/components/TaskList/TaskList.vue'
import AddTask from '@/components/AddTask/AddTask.vue'
import TaskDrawer from '@/components/TaskDrawer/TaskDrawer.vue'
import type { Expose } from '@/components/TaskDrawer/TaskDrawer.vue'
import { useTasksStore, useTasksListStore } from '@/stores/'

defineOptions({
  name: 'TasksPage'
})

const taskDrawerRef = ref<Expose>()
const route = useRoute()
const id = computed(() => route.params.id as string)
const tasksListStore = useTasksListStore()

const taskList = computed(() => {
  return tasksListStore.tasks.find((e) => {
    return e.id == id.value || e.createdWithLocalId == id.value
  })
})

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
      <div class="header">
        <div class="title">{{ taskList?.name }}</div>
        <div class="more"></div>
      </div>
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
  box-sizing: border-box;
  .list {
    flex: 1;
    display: flex;
    padding: 8px 16px;
    flex-direction: column;
    background-color: rgb(111, 131, 211);
    .header {
      padding: 8px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-size: 18px;
        font-weight: bold;
      }
    }
    .task-list {
      flex: 1;
    }
  }
}
</style>
