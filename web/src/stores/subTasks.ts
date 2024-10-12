import type { SubTask } from '@ltfei/todo-common'
import { defineStore } from 'pinia'
import type { StoreCommit, ReadonlyDeep } from '@/types'
import { Commit } from '@/utils/commit'
import { useCommitsStore } from './commits'

export const useSubTasksStore = defineStore('subTasks', () => {
  const tasks = ref<SubTask[]>([])

  const commitsStore = useCommitsStore()
  const commit: StoreCommit<SubTask> = (type, data) => {
    commitsStore.createCommit(new Commit<SubTask>(type, 'tasks', data as SubTask))

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
