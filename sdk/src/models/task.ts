import { type Task } from '@ltfei/todo-common'
import { useAction } from '../utils/useAction'
import type { Data } from '../types'
import dayjs from 'dayjs'
import {
  defaultList,
  inbox,
  important,
  myday,
  planned,
  assignedToMe,
  inboxTaskListId
} from '@ltfei/todo-common'

export const useTask = (data: Data) => {
  const getTasksByParentFolderId = (id: string) => {
    if (!defaultList.includes(id)) {
      return data.tasks.value.filter((e) => {
        return e.parentFolderId == id
      })
    }

    return data.tasks.value.filter((e) => {
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
    ...useAction<Task>(data, 'tasks'),
    getTasksByParentFolderId
  }
}
