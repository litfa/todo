<script setup lang="ts">
import type { Task } from '@ltfei/todo-common'
import { keys } from '@ltfei/todo-common'
import TaskRadio from '@/components/TaskRadio/TaskRadio.vue'
import { useTasksStore, useSubTasksStore } from '@/stores/'
import Switch from '@/components/Switch/Switch.vue'
import dayjs from 'dayjs'
import i18n from '@/lang'
import { type Component } from 'vue'
import { Calendar as IconCalendar } from '@icon-park/vue-next'
import { isToday } from '@/utils/date'

defineOptions({
  name: 'TaskListItem'
})

interface Props extends Task {
  completed?: boolean
}

const { t } = i18n.global
const props = defineProps<Props>()
const tasksStore = useTasksStore()
const subTasksStore = useSubTasksStore()

const subTasks = computed(() => {
  return subTasksStore.subTasks.filter((e) => e.parentId == props.id)
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
  tasksStore.action('update', {
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

const isImported = computed({
  get() {
    return props.isImported
  },
  set(value) {
    tasksStore.action('update', {
      id: props.id,
      isImported: value
    })
  }
})

const desc = computed(() => {
  const texts: { icon?: Component; text: string; color?: string }[] = []
  if (subTasks.value.length > 0) {
    texts.push({
      text: t('step_tips', [completedCount.value, subTasks.value.length])
    })
  }
  if (props.expirationTime) {
    const expiration = dayjs().isAfter(dayjs(props.expirationTime))

    texts.push({
      icon: IconCalendar,
      text: isToday(props.expirationTime)
        ? t('today')
        : dayjs(props.expirationTime).format('MM-DD'),
      color: expiration ? 'var(--danger)' : undefined
    })
  }
  return texts
})
</script>

<template>
  <div class="task-list-item" :class="{ completed }">
    <TaskRadio v-model:status="status" />
    <div class="info">
      <div class="title">{{ subject }}</div>
      <div class="desc">
        <span v-for="(i, index) in desc" :key="i.text" :style="{ '--color': i.color }">
          <a-divider v-if="index != 0" type="vertical" />
          <component :is="i.icon" />
          {{ i.text }}
        </span>
      </div>
    </div>
    <div class="extra">
      <Switch v-model:checked="isImported">
        <template #default="{ checked }">
          <a-tooltip
            placement="bottomRight"
            color="var(--bg-color)"
            arrow-point-at-center
            :mouseEnterDelay="0.6"
          >
            <template #title>
              <span class="tooltip-text">
                {{ $t(checked ? 'delete_important_flags' : 'marked_as_important') }}
              </span>
            </template>
            <IconStar :theme="checked ? 'filled' : 'outline'" fill="var(--primary)" />
          </a-tooltip>
        </template>
      </Switch>
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.tooltip-text {
  color: @text-color;
}
.task-list-item {
  background-color: @bg-color;
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
      span {
        color: var(--color, @text-color);
      }
    }
  }
  .extra {
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
