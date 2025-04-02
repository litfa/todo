<script setup lang="ts">
import { useUserStore } from '@/stores/'
import { todoSdk } from '@/utils/useTodoSdk'
import {
  defaultList,
  generateIdWithSource,
  important,
  inboxTaskListId,
  keys,
  myday,
  planned,
  type Task
} from '@ltfei/todo-common'
import dayjs from 'dayjs'
import AddTaskInput from './AddTaskInput.vue'

defineOptions({
  name: 'AddTask'
})

const route = useRoute()
const id = computed(() => route.params.id as string)
const text = ref('')
const userStore = useUserStore()

const addTask = () => {
  if (!text.value) {
    return
  }

  const taskId = generateIdWithSource()
  const parentFolderId = defaultList.includes(id.value) ? inboxTaskListId : id.value

  const data: Task = {
    body: '',
    isImported: false,
    expirationTime: 0,
    startTime: 0,
    isReminderOn: false,
    parentFolderId,
    reminderDateTime: 0,
    owner: userStore.user.userInfo!.id,
    id: taskId,
    createdWithLocalId: taskId,
    subject: text.value,
    status: keys.task.status.notStarted,
    createdTime: Date.now(),
    completedDateTime: 0,
    lastEditTime: 0,
    isRepeat: false,
    repetitionPeriod: '',
    nextRepeatTaskId: null
  }

  // 重要任务
  if (id.value == important) {
    data.isImported = true
    // 今天/计划内
  } else if (id.value == myday || id.value == planned) {
    data.expirationTime = dayjs().endOf('day').valueOf()
  }
  todoSdk.task.create(data)

  text.value = ''
}
</script>

<template>
  <div class="add-task">
    <AddTaskInput v-model="text" @add-task="addTask" />
  </div>
</template>

<style lang="less" scoped>
.add-task {
  background-color: @black-opacity-1;
  display: flex;
  border-radius: 4px;
}
</style>
