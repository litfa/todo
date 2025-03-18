<script setup lang="ts">
import { keys } from '@ltfei/todo-common'
import { computed } from 'vue'
import './TaskRadio.less'

defineOptions({
  name: 'TaskRadio'
})

const status = defineModel<number>('status', {
  required: true
})
const checked = computed({
  set(value) {
    status.value = value ? keys.task.status.completed : keys.task.status.notStarted
  },
  get() {
    switch (status.value) {
      case keys.task.status.completed:
        return true
      case keys.task.status.notStarted:
        return false
      default:
        return false
    }
  }
})
</script>

<template>
  <div class="task-radio" :class="{ checked }" @click.stop="checked = !checked">
    <!-- <label> -->
    <div class="radio">
      <!-- <icon-check-small class="icon" size="14" /> -->
      <div class="icon"></div>
    </div>
    <!-- </label> -->
  </div>
</template>
