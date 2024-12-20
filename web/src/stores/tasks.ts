import type { Task } from '@ltfei/todo-common'
import {
  defaultList,
  inbox,
  important,
  myday,
  planned,
  assignedToMe,
  inboxTaskListId
} from '@ltfei/todo-common'
import { defineStore } from 'pinia'
import type { ReadonlyDeep } from '@/types'
import { useAction } from '@/utils/useAction'
import dayjs from 'dayjs'
import { useStorage } from '@/utils/useStorage'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])

  const action = useAction(tasks, 'tasks')

  const getTasksByParentFolderId = (id: string) => {
    if (!defaultList.includes(id)) {
      return tasks.value.filter((e) => {
        return e.parentFolderId == id
      })
    }

    return tasks.value.filter((e) => {
      const expirationTime = dayjs(e.expirationTime)
      const expirationTimeIsSameOrAfter =
        expirationTime.isSame(dayjs(), 'day') || expirationTime.isBefore(dayjs(), 'day')
      const filterRules = {
        [inbox]: e.parentFolderId == inboxTaskListId,
        [important]: e.isImported,
        [myday]: e.expirationTime > 0 && expirationTimeIsSameOrAfter,
        [planned]: e.expirationTime,
        [assignedToMe]: false
      }

      return filterRules[id as keyof typeof filterRules]
    })
  }

  return {
    tasks: tasks as Ref<ReadonlyDeep<Task[]>>,
    ...action,
    getTasksByParentFolderId,
    useStorage: () => useStorage('tasks', tasks)
  }
})
