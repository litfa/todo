<script setup lang="ts">
import EditItem from './EditItem.vue'
import { useTasksStore } from '@/stores/'
import dayjs, { type Dayjs } from 'dayjs'
import i18n from '@/lang'
import { formatDate } from '@/utils/date'

defineOptions({
  name: 'EditRepeat'
})

const props = defineProps<{
  taskId: string | bigint
}>()
const { t } = i18n.global
const tasksStore = useTasksStore()
const task = computed(() => tasksStore.tasks.find((e) => e.id == props.taskId)!)
const editRepeatRef = ref<HTMLElement>()
const open = ref(false)
const hasRepetitionPeriod = computed(() => {
  return task.value.isReminderOn && Boolean(task.value.repetitionPeriod)
})
const presets = [
  {
    time: '0 0 0 * * *',
    text: t('everyday'),
    icon: null
  }
  // {
  //   time: '0 0 0 0 * *',
  //   text: t('weekly'),
  //   extendText: '9:00',
  //   icon: null
  // },
  // {
  //   time: '0 0 0 0 0 *',
  //   text: t('monthly'),
  //   extendText: '9:00',
  //   icon: null
  // }
]

const setRepeat = (cron: string | null) => {
  open.value = false
  if (!cron) {
    tasksStore.action('update', {
      id: task.value.id,
      isRepeat: false
    })
    return
  }
  tasksStore.action('update', {
    id: task.value.id,
    isRepeat: true,
    repetitionPeriod: cron
  })
}

const editItemText = computed(() => {
  return hasRepetitionPeriod.value
    ? // ? t('repeat', [dayjs(task.value.repetitionPeriod).format('HH:mm')])
      task.value.repetitionPeriod
    : t('repeat')
})
const subText = computed(() => {
  if (hasRepetitionPeriod.value) {
    return formatDate(task.value.repetitionPeriod, 'day')
  }
})
</script>

<template>
  <div class="edit-repeat" ref="editRepeatRef">
    <a-popover
      v-model:open="open"
      :getPopupContainer="() => editRepeatRef!"
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
          @click="setRepeat(i.time)"
        >
          <template #icon>
            <component :is="i.icon" />
          </template>
        </EditItem>
        <div class="select-date">
          <!-- <a-date-picker
            @update:value="setRepeat"
            :show-time="{ showMinute: false }"
            :show-now="false"
          /> -->
        </div>
      </template>

      <EditItem
        :text="editItemText"
        :subText="subText"
        :extendIcon="hasRepetitionPeriod && 'close'"
        @clickExtendIcon="setRepeat(null)"
        :highlight="hasRepetitionPeriod"
      >
        <template #icon>
          <icon-play-cycle />
        </template>
      </EditItem>
    </a-popover>
  </div>
</template>

<style lang="less" scoped></style>
