<script setup lang="ts">
import Editor from './components/Editor.vue'
import ExpirationTime from './components/ExpirationTime.vue'
import EditReminder from './components/EditReminder.vue'
import dayjs from 'dayjs'
import type { Task } from '@ltfei/todo-common'

defineOptions({
  name: 'TaskDrawerContent'
})

withDefaults(
  defineProps<{
    transitionTime?: string
    task?: Task
  }>(),
  {
    transitionTime: '0'
  }
)

const emit = defineEmits(['close'])

const open = defineModel<boolean>('open', { required: true })

const closeTaskDrawer = () => {
  emit('close')
}
</script>

<template>
  <div class="task-drawer-content" :class="{ open }">
    <template v-if="task">
      <div class="header">
        <div class="close" @click="closeTaskDrawer">
          <icon-close-small />
        </div>
      </div>
      <div class="content">
        <Editor :task-id="task.id" />
        <ExpirationTime :task-id="task.id" />
        <EditReminder :task-id="task.id" />
      </div>
      <div class="footer">
        <div class="create-time">
          创建于 {{ dayjs(task.createdTime).format('YYYY-MM-DD HH:mm') }}
        </div>
        <div class="remove">
          <icon-delete />
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped>
@width: 350px;
.task-drawer-content {
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all v-bind(transitionTime);
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
        background-color: @black-opacity-1;
        border-radius: 4px;
      }
    }
  }
  .content {
    flex: 1;
    overflow: auto;
    overflow-x: hidden;
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
      color: @text-color-primary;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
