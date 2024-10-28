<script setup lang="ts">
import EditItem from './EditItem.vue'
import { useTasksStore } from '@/stores/'
import dayjs, { type Dayjs } from 'dayjs'
import {
  Close as IconClose,
  ArrowCircleRight as IconArrowCircleRight,
  CircleDoubleRight as IconCircleDoubleRight,
  Time as IconTime
} from '@icon-park/vue-next'
import i18n from '@/lang'
import { formatDate } from '@/utils/date'

// todo: 提醒任务

defineOptions({
  name: 'EditReminder'
})

const props = defineProps<{
  taskId: string
}>()
const { t } = i18n.global
const tasksStore = useTasksStore()
const task = computed(() => tasksStore.tasks.find((e) => e.id == props.taskId)!)
const editReminderRef = ref<HTMLElement>()
const open = ref(false)
const hasReminderDateTime = computed(() => {
  return task.value.isReminderOn && Boolean(task.value.reminderDateTime)
})
const presets = [
  {
    time: dayjs().startOf('day').set('hour', 18),
    text: t('later_today'),
    extendText: '18:00',
    icon: IconTime
  },
  {
    time: dayjs().add(1, 'day').startOf('day').set('hour', 9),
    text: t('tomorrow'),
    extendText: '9:00',
    icon: IconArrowCircleRight
  },
  {
    time: dayjs().add(7, 'day').startOf('day'),
    text: t('next_week'),
    extendText: '9:00',
    icon: IconCircleDoubleRight
  }
]

const setReminderOn = (time: string | Dayjs | number) => {
  open.value = false
  tasksStore.action('update', {
    id: task.value.id,
    isReminderOn: time != 0,
    reminderDateTime: dayjs(time).valueOf()
  })
}

const editItemText = computed(() => {
  return hasReminderDateTime.value
    ? t('remind_at', [dayjs(task.value.reminderDateTime).format('HH:mm')])
    : t('reminder')
})
const subText = computed(() => {
  if (hasReminderDateTime.value) {
    return formatDate(task.value.reminderDateTime, 'day')
  }
})
</script>

<template>
  <div class="edit-reminder" ref="editReminderRef">
    <a-popover
      v-model:open="open"
      :getPopupContainer="() => editReminderRef!"
      :arrow="false"
      trigger="click"
      placement="bottom"
      class="edit-reminder-popover"
    >
      <template #content>
        <EditItem
          v-for="i in presets"
          :key="i.time.valueOf()"
          :text="i.text"
          :extendText="i.extendText"
          @click="setReminderOn(i.time)"
        >
          <template #icon>
            <component :is="i.icon" />
          </template>
        </EditItem>
        <div class="select-date">
          <a-date-picker
            @update:value="setReminderOn"
            :show-time="{ showMinute: false }"
            :show-now="false"
          />
        </div>
      </template>

      <EditItem
        :text="editItemText"
        :subText="subText"
        :extendIcon="hasReminderDateTime && IconClose"
        @clickExtendIcon="setReminderOn(0)"
        :highlight="hasReminderDateTime"
      >
        <template #icon>
          <icon-alarm-clock />
        </template>
      </EditItem>
    </a-popover>
  </div>
</template>

<style lang="less" scoped></style>
