<script setup lang="ts">
import TaskList from '@/components/TaskList/TaskList.vue'
import AddTask from '@/components/AddTask/AddTask.vue'
import TaskDrawer from '@/components/TaskDrawer/TaskDrawer.vue'
import type { Expose } from '@/components/TaskDrawer/TaskDrawer.vue'
import { useTasksListStore } from '@/stores/'
import { defaultList } from '@ltfei/todo-common'
import i18n from '@/lang'

defineOptions({
  name: 'TasksPage'
})

const { t } = i18n.global
const taskDrawerRef = ref<Expose>()
const route = useRoute()
const id = computed(() => route.params.id as string)
const tasksListStore = useTasksListStore()

const useMenuMask = inject('useMenuMask')
const openMenu = inject<() => void>('openMenu')

const taskList = computed(() => {
  return tasksListStore.taskList.find((e) => {
    return e.id == id.value
  })
})

const taskListName = computed(() => {
  return defaultList.includes(id.value) ? t(id.value) : taskList.value?.name
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
        <div class="open-menu" v-if="useMenuMask" @click="openMenu">
          <icon-hamburger-button />
        </div>
        <div class="info">
          <div class="title">{{ taskListName }}</div>
          <div class="more"></div>
        </div>
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
      color: @white;
      .open-menu {
        font-size: 18px;
      }
      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
          font-size: 20px;
          font-weight: bold;
          color: @white;
        }
      }
    }
    .task-list {
      flex: 1;
    }
  }
}
</style>
