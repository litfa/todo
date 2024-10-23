import type { Task } from '@ltfei/todo-common'
import { defaultList, inboxTaskListId, inbox } from '@ltfei/todo-common'
import { defineStore } from 'pinia'
import type { ReadonlyDeep } from '@/types'
import { useAction } from '@/utils/useAction'
import { useStorage } from '@/utils/useStorage'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])

  useStorage('tasks', tasks)

  const action = useAction(tasks, 'tasks')

  const getTasksByParentFolderId = (id: string) => {
    if (defaultList.includes(id)) {
      const inboxTasks = tasks.value.filter((e) => {
        return e.parentFolderId == inboxTaskListId
      })
      if (id == inbox) {
        return inboxTasks
      }
    }
    return tasks.value.filter((e) => {
      return e.parentFolderId == id
    })
  }

  return { tasks: tasks as Ref<ReadonlyDeep<Task[]>>, ...action, getTasksByParentFolderId }
})
