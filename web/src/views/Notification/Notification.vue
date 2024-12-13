<script setup lang="ts">
import { getCurrentWindow } from '@tauri-apps/api/window'
import { useTasksStore } from '@/stores/tasks'
import { formatDate } from '@/utils/date'
import { keys } from '@ltfei/todo-common'

defineOptions({
  name: 'NotificationPage'
})
defineProps<{}>()

const route = useRoute()
const tasks = useTasksStore()

const task = computed(() => {
  const taskId = route.query.taskId as string

  if (!taskId) {
    return
  }
  const task = tasks.getStateById(taskId)
  console.log(task)

  return task
})

const closeWindow = () => {
  const currentWindow = getCurrentWindow()
  currentWindow.close()
}

const completed = () => {
  tasks.action('update', {
    id: task.value!.id,
    status: keys.task.status.completed,
    completedDateTime: Date.now()
  })
}
</script>

<template>
  <div class="notification-page">
    <div class="header">
      <div class="left">
        <div class="logo">
          <img src="@/assets/images/logo.png" alt="" />
        </div>
        <div class="expiration-time">
          {{ task?.expirationTime && formatDate(task.expirationTime, 'day') }}
        </div>
      </div>
      <div class="right">
        <div class="close" @click="closeWindow">
          <icon-close></icon-close>
        </div>
      </div>
    </div>
    <div class="content">{{ task?.subject }}</div>
    <div class="footer">
      <a-button type="primary" @click="completed">{{ $t('completed') }}</a-button>
      <a-button>{{ $t('be_reminded_later') }}</a-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.notification-page {
  width: 100%;
  height: 100vh;
  // background-color: @bg-color;
  background-color: #fff;
  padding: 8px 12px;
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .logo {
        width: 14px;
        height: 14px;
        display: flex;
        margin-right: 8px;
        img {
          width: 100%;
        }
      }
      .expiration-time {
        font-size: 12px;
      }
    }
  }
  .content {
    flex: 1;
  }
  .footer {
    display: flex;
    gap: 8px;
    .ant-btn {
      flex: 1;
    }
  }
}
</style>
