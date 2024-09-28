import type { TaskList } from '@ltfei/todo-common'
import { defineStore } from 'pinia'

export const useTasksListStore = defineStore('taskList', () => {
  const tasks = ref<TaskList[]>([
    {
      id: '1',
      createdWithLocalId: '1',
      isSharedFolder: false,
      IsOwner: false,
      name: '列表1',
      sharingLink: '',
      showCompletedTasks: false,
      sortAscending: false,
      sortType: '',
      themeBackground: '',
      themeColor: '',
      parentFolderGroupId: ''
    },
    {
      id: '2',
      createdWithLocalId: '2',
      isSharedFolder: false,
      IsOwner: false,
      name: '列表2',
      sharingLink: '',
      showCompletedTasks: false,
      sortAscending: false,
      sortType: '',
      themeBackground: '',
      themeColor: '',
      parentFolderGroupId: ''
    }
  ])

  const createList = (name: string) => {
    tasks.value.push({
      id: null,
      createdWithLocalId: `web:${Date.now()}`,
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
