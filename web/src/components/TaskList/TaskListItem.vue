<script setup lang="ts">
import type { Task } from '@ltfei/todo-common'
import { keys } from '@ltfei/todo-common'
import TaskRadio from '@/components/TaskRadio/TaskRadio.vue'
import { useTasksStore, useSubTasksStore } from '@/stores/'

defineOptions({
  name: 'TaskListItem'
})

interface Props extends Task {
  completed?: boolean
}

const props = defineProps<Props>()
const tasksStore = useTasksStore()
const subTasksStore = useSubTasksStore()

const subTasks = computed(() => {
  return subTasksStore.tasks.filter((e) => e.parentId == props.id)
})

const completedCount = computed(() => {
  return subTasks.value.reduce((accumulator, currentValue) => {
    if (currentValue.status == keys.task.status.completed) {
      return accumulator + 1
    }
    return accumulator
  }, 0)
})

const updateStatus = (status: number) => {
  tasksStore.commit('update', {
    id: props.id,
    status: status
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
</script>

<template>
  <div class="task-list-item" :class="{ completed }">
    <!-- <a-radio v-model:checked="checked"></a-radio> -->
    <TaskRadio v-model:status="status" />
    <div class="info">
      <div class="title">{{ subject }}</div>
      <div class="desc">
        <template v-if="subTasks.length > 0">
          第 {{ completedCount }} 步，共 {{ subTasks.length }} 步
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
