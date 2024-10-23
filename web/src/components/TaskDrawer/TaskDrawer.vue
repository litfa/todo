<script setup lang="ts">
import { useTasksStore } from '@/stores/'
import Editor from './Editor.vue'
import { CloseSmall as IconCloseSmall, Delete as IconDelete } from '@icon-park/vue-next'

defineOptions({
  name: 'TaskDrawer'
})

const route = useRoute()
const tasksStore = useTasksStore()
const open = ref(false)
const taskId = ref<string | null>(null)
const task = computed(() => tasksStore.tasks.find((e) => e.id == taskId.value)!)

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
  <div class="task-drawer" :class="{ open }">
    <template v-if="taskId">
      <div class="header">
        <div class="close" @click="closeTaskDrawer">
          <icon-close-small />
        </div>
      </div>
      <div class="content">
        <Editor :task-id="taskId" />
      </div>
      <div class="footer">
        <div class="create-time">创建于 {{ task.createdTime }}</div>
        <div class="remove">
          <icon-delete />
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped>
@width: 350px;
.task-drawer {
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  width: 0;
  padding: 8px 0;
  box-sizing: border-box;
  &.open {
    width: @width;
    padding: 8px;
  }
  .header {
    display: flex;
    justify-content: flex-end;
    .close {
      padding: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      .i-icon {
        display: flex;
      }

      &:hover {
        background-color: #aaaaaa2f;
        border-radius: 4px;
      }
    }
  }
  .content {
    flex: 1;
    overflow: auto;
    padding: 8px 0;
    // width: @width;
  }
  .footer {
    height: 40px;
    font-size: 14px;
    display: flex;
    align-items: center;
    border-top: #3838382f 1px solid;
    .create-time {
      flex: 1;
      text-align: center;
      color: #383838;
    }
    .remove {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
