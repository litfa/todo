<script setup lang="ts">
import Switch from '@/components/Switch/Switch.vue'
import TaskRadio from '@/components/TaskRadio/TaskRadio.vue'
import i18n from '@/lang'
import { isToday, isTomorrow, isYesterday } from '@/utils/date'
import { todoSdk } from '@/utils/useTodoSdk'
import type { Task } from '@ltfei/todo-common'
import { inbox, inboxTaskListId, keys, parse36RadixId } from '@ltfei/todo-common'
import dayjs from 'dayjs'
import { type Component } from 'vue'

defineOptions({
  name: 'TaskListItem'
})

interface Props extends Task {
  completed?: boolean
  showBorder?: boolean
}

const { t } = i18n.global
const props = defineProps<Props>()
const route = useRoute()
const taskListId = computed(() => route.params.id as string)
defineEmits(['click'])

const subTasks = computed(() => {
  return todoSdk.data.subTasks.value.filter(
    (e) => parse36RadixId(e.parentId) == parse36RadixId(props.id)
  )
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

const desc = computed(() => {
  const texts: { icon?: Component; text: string; color?: string }[] = []
  if (subTasks.value.length > 0) {
    texts.push({
      text: t('step_tips', [completedCount.value, subTasks.value.length])
    })
  }
  if (props.expirationTime) {
    const expiration = dayjs().isAfter(dayjs(props.expirationTime))
    let text = dayjs(props.expirationTime).format('MM-DD')
    let color: string | undefined
    if (expiration) {
      color = 'var(--danger)'
    }
    if (isToday(props.expirationTime)) {
      text = t('today')
      color = 'var(--primary)'
    } else if (isTomorrow(props.expirationTime)) {
      text = t('tomorrow')
    } else if (isYesterday(props.expirationTime)) {
      text = t('yesterday')
    }

    texts.push({
      icon: IconCalendar,
      text,
      color
    })
  }
  if (taskListId.value != props.parentFolderId && taskListId.value != inbox) {
    const taskList = todoSdk.taskList.getStateById(props.parentFolderId)

    texts.push({
      text:
        taskList?.name ||
        (props.parentFolderId == inboxTaskListId ? t('inbox') : t('unnamed_tasklist'))
    })
  }
  if (props.isRepeat) {
    texts.push({
      text: '',
      icon: IconPlayCycle
    })
  }
  return texts
})
</script>

<template>
  <div class="task-list-item" :class="{ completed }" @click="$emit('click')">
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
  <div class="border" v-if="showBorder"></div>
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
.border {
  width: 100%;
  height: 1px;
  background-color: @black-opacity-1;
  opacity: 0.8;
}
</style>
