<script setup lang="ts">
import { keys } from '@ltfei/todo-common'
import { useTasksStore, useTasksListStore } from '@/stores/'
import AddTaskInput from '@/components/AddTask/AddTaskInput.vue'
import { generateId } from '@/utils/snowflake'
import TaskRadio from '@/components/TaskRadio/TaskRadio.vue'

defineOptions({
  name: 'TaskEditor'
})

const props = defineProps<{
  taskId: string
}>()

const tasksStore = useTasksStore()

const task = computed(() => tasksStore.tasks.find((e) => e.id == props.taskId)!)

const checked = computed({
  get() {
    return task.value?.status == keys.task.status.completed
  },
  set(value) {
    task.value.status = value ? keys.task.status.completed : keys.task.status.notStarted
  }
})

const addTask = (value: string, clearInput: () => void) => {
  const id = generateId()
  task.value.subtasks.push({
    parentId: task.value.id,
    id,
    createdWithLocalId: id,
    subject: value,
    status: 0,
    createdTime: Date.now(),
    completedDateTime: 0,
    lastEditTime: 0
  })

  clearInput()
}
</script>

<template>
  <div class="editor" v-if="task">
    <div class="task">
      <task-radio v-model:status="task.status" />
      <a-textarea v-model:value="task.subject" auto-size />
    </div>
    <div class="task" v-for="i in task?.subtasks" :key="i.id">
      <task-radio v-model:status="i.status" />
      <a-textarea v-model:value="i.subject" auto-size />
    </div>

    <div class="add-task">
      <AddTaskInput placeholder="下一步" :icon-size="14" @add-task="addTask" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.editor {
  display: flex;
  flex-direction: column;
  gap: 8px;
  .task {
    display: flex;
    align-items: flex-start;
    .input {
      flex: 1;
      line-height: 18px;
      font-size: 18px;
    }
  }
}
</style>
