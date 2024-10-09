<script setup lang="ts">
import type { Task } from '@ltfei/todo-common'
import { keys } from '@ltfei/todo-common'
import TaskRadio from '@/components/TaskRadio/TaskRadio.vue'
import { useTasksStore } from '@/stores/'

defineOptions({
  name: 'TaskListItem'
})

interface Props extends Task {
  completed?: boolean
}

const props = defineProps<Props>()
const tasksStore = useTasksStore()

const completedCount = computed(() => {
  return props.subtasks.reduce((accumulator, currentValue) => {
    if (currentValue.status == keys.task.status.completed) {
      return accumulator + 1
    }
    return accumulator
  }, 0)
})

const updateStatus = (status: number) => {
  const i = tasksStore.tasks.findIndex((e) => {
    return e.id == props.id
  })

  tasksStore.tasks[i].status = status
}

const status = computed({
  get() {
    return props.status
  },
  set(value) {
    updateStatus(value)
  }
})
</script>

<template>
  <div class="task-list-item" :class="{ completed }">
    <!-- <a-radio v-model:checked="checked"></a-radio> -->
    <TaskRadio v-model:status="status" />
    <div class="info">
      <div class="title">{{ subject }}</div>
      <div class="desc">
        <template v-if="subtasks.length > 0">
          第 {{ completedCount }} 步，共 {{ subtasks.length }} 步
        </template>
      </div>
    </div>
    <div class="extra">
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.task-list-item {
  background-color: pink;
  // margin: 8px;
  border-radius: 5px;
  display: flex;
  padding: 8px;
  align-items: flex-start;
  position: relative;
  .task-radio {
    height: 20px;
    display: flex;
    align-items: center;
    margin-right: 4px;
  }
  .info {
    .desc {
      font-size: 12px;
    }
  }
  .right {
    margin-left: auto;
  }
  &.completed {
    .info {
      opacity: 0.5;
      .title {
        text-decoration: line-through;
      }
    }
  }
}
</style>
