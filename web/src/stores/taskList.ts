import type { TaskList } from '@ltfei/todo-common'
import { defineStore } from 'pinia'
import { generateId } from '../utils/snowflake'

export const useTasksListStore = defineStore('taskList', () => {
  const tasks = ref<TaskList[]>([])

  const createList = (name: string) => {
    const id = generateId()
    tasks.value.push({
      id: id,
      createdWithLocalId: id,
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
