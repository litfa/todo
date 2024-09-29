import type { Task } from '@ltfei/todo-common'
import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])

  return { tasks }
})
