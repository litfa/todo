<script setup lang="ts">
import TaskList from '@/components/TaskList/TaskList.vue'
import AddTask from '@/components/AddTask/AddTask.vue'
import TaskDrawer from '@/components/TaskDrawer/TaskDrawer.vue'
import type { Expose } from '@/components/TaskDrawer/TaskDrawer.vue'
import { useTasksListStore } from '@/stores/'
import { defaultList } from '@ltfei/todo-common'

defineOptions({
  name: 'TasksPage'
})

const taskDrawerRef = ref<Expose>()
const route = useRoute()
const id = computed(() => route.params.id as string)
const tasksListStore = useTasksListStore()

const taskList = computed(() => {
  return tasksListStore.taskList.find((e) => {
    return e.id == id.value
  })
})

const taskListName = computed(() => {
  // todo: 默认列表使用i18n展示
  return defaultList.includes(id.value) ? '任务' : taskList.value?.name
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
        <div class="title">{{ taskListName }}</div>
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
    background-color: @primary;
    .header {
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-size: 20px;
        font-weight: bold;
        color: @white;
      }
    }
    .task-list {
      flex: 1;
    }
  }
}
</style>
