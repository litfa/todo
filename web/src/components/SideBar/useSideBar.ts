import { todoSdk } from '@/utils/useTodoSdk'
import type { Icon } from '@icon-park/vue-next/lib/runtime'

interface Item {
  key: string
  title: string
  icon: Icon
}

export const useSideBar = () => {
  const isSynchronizing = useSynchronizing()

  const sideBarItems: Item[] = [
    {
      key: '/tasks',
      title: '首页',
      icon: IconListTwo
    },
    {
      key: '/calendar',
      title: '日历视图',
      icon: IconCalendar
    }
  ]

  const sync = async () => {
    await todoSdk.syncService.sync()
  }

  return {
    isSynchronizing,
    sideBarItems,
    sync
  }
}

/**
 * 让同步动画至少完整播放一次
 */
const useSynchronizing = () => {
  const isSynchronizing = ref(false)
  let startTime = 0
  let timeout: number | null = null
  watch(
    () => todoSdk.syncService.isSynchronizing.value,
    (value) => {
      console.log(value)

      if (value) {
        isSynchronizing.value = true
        startTime = Date.now()
        timeout && clearTimeout(timeout)
        return
      }

      if (Date.now() - startTime > 1000) {
        isSynchronizing.value = false
        return
      }

      timeout = setTimeout(
        () => {
          isSynchronizing.value = false
        },
        1000 - (Date.now() - startTime)
      )
    }
  )

  return isSynchronizing
}
