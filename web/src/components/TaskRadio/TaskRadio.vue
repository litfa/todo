<script setup lang="ts">
import { CheckSmall as IconCheckSmall } from '@icon-park/vue-next'
import { keys } from '@ltfei/todo-common'

defineOptions({
  name: 'TaskRadio'
})

const status = defineModel<number>('status')
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
    <label>
      <div class="radio">
        <icon-check-small class="icon" size="14" />
      </div>
    </label>
  </div>
</template>

<style lang="less" scoped>
.task-radio {
  .radio {
    width: 16px;
    height: 16px;
    border: 1px solid @text-color-secondary;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      opacity: 0;
      transition: all 0.1s;
    }
    &:hover .icon {
      opacity: 1;
    }
  }
  &.checked {
    .radio {
      background-color: @primary;
      .icon {
        opacity: 1;
        color: #fff;
      }
    }
  }
}
</style>
