import type { taskGroup } from '@ltfei/todo-common'
import { defineStore } from 'pinia'

export const useTaskGroupStore = defineStore('taskGroup', () => {
  const taskGroup = ref<taskGroup[]>([])

  return { taskGroup }
})
