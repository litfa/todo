<script setup lang="ts">
import EditItem from './EditItem.vue'
// import { useTasksStore } from '@/stores/'
import dayjs, { type Dayjs } from 'dayjs'
// import { Close as IconClose } from '@icon-park/vue-next'
import i18n from '@/lang'
import { todoSdk } from '@/utils/useTodoSdk'

defineOptions({
  name: 'ExpirationTime'
})

const props = defineProps<{
  taskId: string
}>()

const { t } = i18n.global
// const tasksStore = useTasksStore()
const task = computed(() => todoSdk.data.tasks.value.find((e) => e.id == props.taskId)!)
const expirationTimeRef = ref<HTMLElement>()
const open = ref(false)
const hasExpirationTime = computed(() => Boolean(task.value.expirationTime))
const presets = [
  {
    time: dayjs().endOf('day'),
    text: t('today')
  },
  {
    time: dayjs().add(1, 'day').endOf('day'),
    text: t('tomorrow')
  }
]

const setExpirationTime = (time: string | Dayjs | number) => {
  open.value = false
  todoSdk.task.action('update', {
    id: task.value.id,
    expirationTime: dayjs(time).valueOf()
  })
}
</script>

<template>
  <div class="expiration-time" ref="expirationTimeRef">
    <a-popover
      v-model:open="open"
      :getPopupContainer="() => expirationTimeRef!"
      :arrow="false"
      trigger="click"
      placement="bottom"
      class="expiration-time-popover"
    >
      <template #content>
        <EditItem
          v-for="i in presets"
          :key="i.time.valueOf()"
          :text="i.text"
          :extendText="$t('week_' + i.time.day())"
          @click="setExpirationTime(i.time)"
        >
          <template #icon>
            <IconCalendar />
          </template>
        </EditItem>
        <div class="select-date">
          <a-date-picker @update:value="setExpirationTime" />
        </div>
      </template>

      <EditItem
        :text="hasExpirationTime ? dayjs(task.expirationTime).format('YYYY-MM-DD') : '添加截止时间'"
        :extendIcon="hasExpirationTime && 'close'"
        @clickExtendIcon="setExpirationTime(0)"
        :highlight="hasExpirationTime"
      >
        <template #icon>
          <IconCalendar />
        </template>
      </EditItem>
    </a-popover>
  </div>
</template>

<style lang="less" scoped>
.expiration-time {
  :deep(.ant-popover-inner) {
    padding: 0;
    .select-date {
      padding: 5px;
    }
  }
}
</style>
