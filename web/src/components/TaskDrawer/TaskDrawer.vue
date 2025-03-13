<script setup lang="ts">
// import { useTasksStore } from '@/stores/'
import TaskDrawerContent from './TaskDrawerContent.vue'
import { useWindowSize } from '@vueuse/core'
import { todoSdk } from '@/utils/useTodoSdk'

defineOptions({
  name: 'TaskDrawer'
})

const route = useRoute()
// const tasksStore = useTasksStore()
const open = ref(false)
const taskId = ref<string | null>(null)
const task = computed(() => todoSdk.data.tasks.value.find((e) => e.id == taskId.value)!)
const { width } = useWindowSize()
const useMask = computed(() => width.value < 870)

const openTaskDrawer = (id: string) => {
  // 重复点击已打开的应当关闭
  if (taskId.value == id) {
    closeTaskDrawer()
    return
  }
  open.value = true
  taskId.value = id
}
const closeTaskDrawer = () => {
  open.value = false
  taskId.value = null
}

// 切换任务列表时关闭
watch(
  () => route.params,
  () => {
    closeTaskDrawer()
  }
)

const expose = {
  openTaskDrawer
}

defineExpose(expose)
type Expose = typeof expose
export type { Expose }
</script>

<template>
  <template v-if="useMask">
    <a-drawer v-model:open="open" placement="right" root-class-name="task-drawer-root">
      <TaskDrawerContent :open="open" width="100%" :task @close="closeTaskDrawer" />
    </a-drawer>
  </template>
  <template v-else>
    <TaskDrawerContent :open="open" :task transition-time="0.3s" @close="closeTaskDrawer" />
  </template>
</template>

<style lang="less">
.task-drawer-root {
  .ant-drawer-content-wrapper {
    width: 100vw !important;
    max-width: 350px;
    .ant-drawer-header {
      display: none;
    }
    .ant-drawer-body {
      padding: 0;
    }
  }
}
</style>
