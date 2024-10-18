import type { SubTask } from '@ltfei/todo-common'
import { defineStore } from 'pinia'
import type { ReadonlyDeep } from '@/types'
import { useAction } from '@/utils/useAction'
import { useStorage } from '@/utils/useStorage'

export const useSubTasksStore = defineStore('subTasks', () => {
  const subTasks = ref<SubTask[]>([])

  useStorage('subTasks', subTasks)

  const action = useAction(subTasks, 'subTasks')

  return { tasks: subTasks as Ref<ReadonlyDeep<SubTask[]>>, action }
})
