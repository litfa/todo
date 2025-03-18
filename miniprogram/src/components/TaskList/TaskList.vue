<script setup lang="ts">
import TaskListItem from '../TaskListItem/TaskListItem.vue'
import { keys } from '@ltfei/todo-common'
import { todoSdk } from '../../utils/useTodoSdk'
import { computed, ref } from 'vue'
import './TaskList.less'

defineOptions({
  name: 'TaskList'
})

const emit = defineEmits<{
  clickTaskItem: [id: string]
}>()

// const route = useRoute()

// const id = computed(() => route.params.id as string)
const id = ref('inbox')
const showCompleted = ref(false)

const tasks = computed(() => todoSdk.task.getTasksByParentFolderId(id.value))

const notStartedTasks = computed(() => {
  return tasks.value.filter((e) => {
    return e.status == keys.task.status.completed
  })
})

const completedTasks = computed(() => {
  return tasks.value.filter((e) => {
    return e.status == keys.task.status.notStarted
  })
})

const clickTaskItem = (id: string) => {
  emit('clickTaskItem', id)
}
const completedCount = computed(() =>
  tasks.value.reduce((previousValue, currentValue) => {
    if (currentValue.status == keys.task.status.completed) {
      return previousValue + 1
    }
    return previousValue
  }, 0)
)
</script>

<template>
  <div class="task-list">
    <TaskListItem
      v-for="i in completedTasks"
      :key="i.id || i.createdWithLocalId"
      v-bind="i"
      @click="clickTaskItem(i.id)"
    />
    <div
      class="collapse-button"
      :class="{ open: showCompleted }"
      @click="showCompleted = !showCompleted"
      v-show="completedCount > 0"
    >
      <div class="icon">
        <icon-right />
      </div>
      <div class="text">已完成 {{ completedCount }}</div>
    </div>
    <TaskListItem
      v-show="showCompleted"
      completed
      v-for="i in notStartedTasks"
      :key="i.id || i.createdWithLocalId"
      v-bind="i"
      @click="clickTaskItem(i.id)"
    />
  </div>
</template>
