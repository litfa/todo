<script setup lang="ts">
// import { useTasksStore } from '@/stores/'
import { todoSdk } from '@/utils/useTodoSdk'
import { generateIdWithSource } from '@/utils/snowflake'
import AddTaskInput from './AddTaskInput.vue'
import { keys, defaultList, inboxTaskListId } from '@ltfei/todo-common'

defineOptions({
  name: 'AddTask'
})

const route = useRoute()
const id = computed(() => route.params.id as string)
const text = ref('')
// const tasksStore = useTasksStore()

const addTask = () => {
  if (!text.value) {
    return
  }

  const taskId = generateIdWithSource()
  const parentFolderId = defaultList.includes(id.value) ? inboxTaskListId : id.value
  todoSdk.task.action('create', {
    body: '',
    isImported: false,
    expirationTime: 0,
    startTime: 0,
    isReminderOn: false,
    parentFolderId,
    reminderDateTime: 0,
    owner: 1,
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
  })

  console.log(todoSdk)

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
  background-color: @white-opacity-8;
  display: flex;
  border-radius: 4px;
}
</style>
