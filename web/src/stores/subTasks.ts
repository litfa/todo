import type { SubTask } from '@ltfei/todo-common'
import { defineStore } from 'pinia'
import type { Commit, ReadonlyDeep } from '@/types'

export const useSubTasksStore = defineStore('subTasks', () => {
  const tasks = ref<SubTask[]>([])

  const commit: Commit<SubTask> = (type, data) => {
    if (type == 'create') {
      tasks.value.push(data as SubTask)
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
        ...(data as SubTask)
      }
    }
  }

  return { tasks: tasks as Ref<ReadonlyDeep<SubTask[]>>, commit }
})
