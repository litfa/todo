<script setup lang="ts">
import { useTasksStore, useTasksListStore } from '@/stores/'
import { generateId } from '@/utils/snowflake'
import AddTaskInput from './AddTaskInput.vue'

defineOptions({
  name: 'AddTask'
})

const route = useRoute()
const id = computed(() => route.params.id)
const text = ref('')
const tasksListStore = useTasksListStore()
const tasksStore = useTasksStore()

const addTask = () => {
  if (!text.value) {
    return
  }
  const tasksList = tasksListStore.tasks.find((e) => {
    return e.id == id.value || e.createdWithLocalId == id.value
  })
  const taskId = generateId()
  tasksStore.tasks.push({
    body: '',
    isImported: false,
    expirationTime: 0,
    startTime: 0,
    isReminderOn: false,
    parentFolderId: tasksList?.id || tasksList!.createdWithLocalId,
    reminderDateTime: 0,
    createUser: 0,
    subtasks: [],
    id: taskId,
    createdWithLocalId: taskId,
    subject: text.value,
    status: 0,
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
