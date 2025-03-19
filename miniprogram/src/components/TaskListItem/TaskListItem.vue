<script setup lang="ts">
import TaskRadio from '@/components/TaskRadio/TaskRadio.vue'
import { todoSdk } from '@/utils/useTodoSdk'
import { keys, Task } from '@ltfei/todo-common'
import { computed } from 'vue'

defineOptions({
  name: 'TaskListItem'
})

interface Props extends Task {
  completed?: boolean
}

const props = defineProps<Props>()

const updateStatus = (status: number) => {
  todoSdk.task.action('update', {
    id: props.id,
    status: status,
    completedDateTime: status == keys.task.status.completed ? Date.now() : 0
  })
}

const status = computed({
  get() {
    return props.status
  },
  set(value) {
    updateStatus(value)
  }
})

const isImported = computed({
  get() {
    return props.isImported
  },
  set(value) {
    todoSdk.task.action('update', {
      id: props.id,
      isImported: value
    })
  }
})
</script>

<template>
  <div class="task-list-item">
    <TaskRadio v-model:status="status" />
    {{ props.subject }}
  </div>
</template>

<style lang="less" scoped></style>
