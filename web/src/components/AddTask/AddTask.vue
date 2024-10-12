<script setup lang="ts">
import { useTasksStore } from '@/stores/'
import { generateId } from '@/utils/snowflake'
import AddTaskInput from './AddTaskInput.vue'
import { keys, defaultList, inboxTaskListId } from '@ltfei/todo-common'

defineOptions({
  name: 'AddTask'
})

const route = useRoute()
const id = computed(() => route.params.id as string)
const text = ref('')
const tasksStore = useTasksStore()

const addTask = () => {
  if (!text.value) {
    return
  }

  const taskId = generateId()
  const parentFolderId = defaultList.includes(id.value) ? inboxTaskListId : id.value
  tasksStore.action('create', {
    body: '',
    isImported: false,
    expirationTime: 0,
    startTime: 0,
    isReminderOn: false,
    parentFolderId,
    reminderDateTime: 0,
    createUser: 0,
    id: taskId,
    createdWithLocalId: taskId,
    subject: text.value,
    status: keys.task.status.notStarted,
    createdTime: Date.now(),
    completedDateTime: 0,
    lastEditTime: 0
  })
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
  background-color: pink;
  display: flex;
  border-radius: 4px;
}
</style>
