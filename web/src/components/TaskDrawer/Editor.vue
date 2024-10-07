<script setup lang="ts">
import { keys } from '@ltfei/todo-common'
import { useTasksStore, useTasksListStore } from '@/stores/'
import AutoHeightTextarea from '@/components/AutoHeightTextarea/AutoHeightTextarea.vue'
import AddTaskInput from '@/components/AddTask/AddTaskInput.vue'
import { generateId } from '@/utils/snowflake'

defineOptions({
  name: 'TaskEditor'
})

const tasksStore = useTasksStore()

const task = computed(() => tasksStore.tasks[0])

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
  <div class="editor">
    <div class="task">
      <a-radio :checked="checked" @click="checked = !checked"></a-radio>
      <AutoHeightTextarea v-model:model-value="task.subject" class="input"></AutoHeightTextarea>
    </div>
    <div class="task" v-for="i in task?.subtasks" :key="i.id">
      <a-radio :checked="checked"></a-radio>
      <AutoHeightTextarea v-model:model-value="i.subject" class="input"></AutoHeightTextarea>
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
  .task {
    display: flex;
    align-items: flex-start;
    .input {
      flex: 1;
      line-height: 18px;
      font-size: 18px;
      transition: all 0.3s;
    }
  }
}
</style>
