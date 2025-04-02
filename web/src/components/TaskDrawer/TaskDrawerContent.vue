<script setup lang="ts">
import Editor from './components/Editor.vue'
import ExpirationTime from './components/ExpirationTime.vue'
import EditReminder from './components/EditReminder.vue'
import EditRepeat from './components/EditRepeat.vue'
import type { Task } from '@ltfei/todo-common'
import { formatDate } from '@/utils/date'
import { keys } from '@ltfei/todo-common'

defineOptions({
  name: 'TaskDrawerContent'
})

withDefaults(
  defineProps<{
    transitionTime?: string
    task?: Task
    width?: string
  }>(),
  {
    transitionTime: '0',
    width: '350px'
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
        <div class="divider"></div>
        <ExpirationTime :task-id="task.id" />
        <EditReminder :task-id="task.id" />
        <EditRepeat :task-id="task.id" />
      </div>
      <div class="footer">
        <div class="create-time" v-if="task.status == keys.task.status.completed">
          {{ $t('completed_in', [formatDate(task.completedDateTime, 'day')]) }}
        </div>
        <div class="create-time" v-else>
          {{ $t('create_in', [formatDate(task.createdTime, 'day')]) }}
        </div>
        <div class="remove">
          <icon-delete />
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped>
@width: v-bind(width);
.task-drawer-content {
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all v-bind(transitionTime);
  width: 0;
  box-sizing: border-box;
  border-left: 1px solid @black-opacity-1;
  padding-top: 16px;

  gap: 8px;
  &.open {
    width: @width;
    // padding: 16px;
  }
  .header {
    display: flex;
    justify-content: flex-end;
    padding: 0 16px;
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
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    .divider {
      width: 100%;
      height: 0;
      border-bottom: 1px solid @black-opacity-1;
      margin: 4px 0;
    }
  }
  .footer {
    height: 40px;
    font-size: 14px;
    display: flex;
    align-items: center;
    border-top: #3838382f 1px solid;
    // padding-top: 16px;
    height: 53px;
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
      .i-icon {
        display: flex;
      }
    }
  }
}
</style>
