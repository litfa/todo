import type { Task } from '@ltfei/todo-common'
import { defineStore } from 'pinia'
import type { Commit, ReadonlyDeep } from '@/types'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])

  const commit: Commit<Task> = (type, data) => {
    if (type == 'create') {
      tasks.value.push(data as Task)
      return
    }
    const i = tasks.value.findIndex((e) => e.id == data.id)
    if (type == 'delete') {
      tasks.value.splice(i, 1)
      return
    }
    if (type == 'update') {
      tasks.value[i] = {
        ...tasks.value[i],
        ...(data as Task)
      }
    }
  }

  return { tasks: tasks as Ref<ReadonlyDeep<Task[]>>, commit }
})
