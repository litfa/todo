import type { TaskList } from '@ltfei/todo-common'
import { defineStore } from 'pinia'

export const useTasksListStore = defineStore('taskList', () => {
  const tasks = ref<TaskList[]>([])

  return { tasks }
})
