<script setup lang="ts">
import TaskListItem from '../TaskList/TaskListItem.vue'
import { useTasksStore, useTasksListStore } from '@/stores/'
import Editor from './Editor.vue'
import { CloseSmall as IconCloseSmall, Delete as IconDelete } from '@icon-park/vue-next'

defineOptions({
  name: 'TaskDrawer'
})

const open = ref(true)

const tasksStore = useTasksStore()
</script>

<template>
  <div class="task-drawer" :class="{ open }">
    <div class="header">
      <div class="close">
        <icon-close-small />
      </div>
    </div>
    <div class="content">
      <Editor />
    </div>
    <div class="footer">
      <div class="create-time">创建于 {{ 123 }}</div>
      <div class="remove">
        <icon-delete />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.task-drawer {
  width: 0;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  &.open {
    width: 300px;
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
  }
  .footer {
    width: 100%;
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
