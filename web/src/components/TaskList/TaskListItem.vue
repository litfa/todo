<script setup lang="ts">
import type { Task } from '@ltfei/todo-common'
import { keys } from '@ltfei/todo-common'

defineOptions({
  name: 'TaskListItem'
})

const props = defineProps<Task>()

const checked = ref(false)

const completedCount = computed(() => {
  return props.subtasks.reduce((accumulator, currentValue) => {
    if (currentValue.status == keys.task.status.completed) {
      return accumulator + 1
    }
    return accumulator
  }, 0)
})
</script>

<template>
  <div class="task-list-item">
    <a-radio v-model:checked="checked"></a-radio>
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
  margin: 8px;
  border-radius: 5px;
  display: flex;
  padding: 8px;
  align-items: flex-start;
  .info {
    .desc {
      font-size: 12px;
    }
  }
  .right {
    margin-left: auto;
  }
}
</style>
