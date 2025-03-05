import type { SubTask } from '@ltfei/todo-common'
import { defineStore } from 'pinia'
import type { ReadonlyDeep } from '@/types'
import { useAction } from '@/utils/useAction'
import { useStorage } from '@/utils/useStorage'

export const useSubTasksStore = defineStore('subTasks', () => {
  const subTasks = ref<SubTask[]>([])

  const action = useAction(subTasks, 'subTasks')

  return {
    subTasks: subTasks as Ref<ReadonlyDeep<SubTask[]>>,
    ...action,
    useStorage: () => useStorage('subTasks', subTasks)
  }
})
