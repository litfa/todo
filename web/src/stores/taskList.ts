import type { TaskList } from '@ltfei/todo-common'
import { defineStore } from 'pinia'
import { generateId } from '../utils/snowflake'

export const useTasksListStore = defineStore('taskList', () => {
  const tasks = ref<TaskList[]>([])

  const createList = (name: string) => {
    tasks.value.push({
      id: null,
      createdWithLocalId: generateId(),
      isSharedFolder: false,
      IsOwner: false,
      name,
      sharingLink: '',
      showCompletedTasks: true,
      sortAscending: false,
      sortType: '',
      themeBackground: '',
      themeColor: '',
      parentFolderGroupId: ''
    })
  }

  return { tasks, createList }
})
