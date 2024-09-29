<script setup lang="ts">
import { Round as IconRound, Plus as IconPlus } from '@icon-park/vue-next'
import { useTasksStore, useTasksListStore } from '@/stores/'
import { generateId } from '@/utils/snowflake'

defineOptions({
  name: 'AddTask'
})

const route = useRoute()
const id = route.params.id
const text = ref('')
const tasksListStore = useTasksListStore()
const tasksStore = useTasksStore()

const addTask = () => {
  if (!text.value) {
    return
  }
  const tasksList = tasksListStore.tasks.find((e) => {
    return e.id == id || e.createdWithLocalId == id
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
    lastEditTime: false
  })
  text.value = ''
}
</script>

<template>
  <div class="add-task">
    <input
      type="text"
      class="task-name"
      placeholder="添加任务"
      v-model="text"
      @keydown.stop.enter="addTask"
    />
    <icon-round class="icon-radio" />
    <icon-plus class="icon-add" />
  </div>
</template>

<style lang="less" scoped>
.i-icon {
  display: flex;
}
.add-task {
  background-color: pink;
  display: flex;
  height: 40px;
  align-items: center;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 4px;
  position: relative;
  .icon-radio,
  .icon-add {
    font-size: 22px;
    position: absolute;
    left: 8px;
    transition: all 0.05s linear;
  }
  .icon-radio {
    opacity: 0;
  }
  .task-name {
    flex: 1;
    height: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    margin-left: 30px;
    &::placeholder {
      color: #000;
    }
    &:focus ~ .icon-add {
      opacity: 0;
    }
    &:focus ~ .icon-radio {
      opacity: 1;
    }
    &:focus::placeholder {
      color: transparent;
    }
  }
}
</style>

<style></style>
