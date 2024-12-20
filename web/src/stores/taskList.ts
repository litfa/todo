import type { TaskList } from '@ltfei/todo-common'
import { defineStore } from 'pinia'
import { generateIdWithSource } from '../utils/snowflake'
import type { ReadonlyDeep } from '@/types'
import { useAction } from '@/utils/useAction'
import { useStorage } from '@/utils/useStorage'

export const useTasksListStore = defineStore('taskList', () => {
  const taskList = ref<TaskList[]>([])

  const action = useAction(taskList, 'taskList')

  const createList = (name: string) => {
    const id = generateIdWithSource()
    action.action('create', {
      id: id,
      createdWithLocalId: id,
      isSharedFolder: false,
      owner: '1',
      name,
      sharingLink: '',
      showCompletedTasks: true,
      sortAscending: false,
      sortType: '',
      themeBackground: '',
      themeColor: '',
      parentFolderGroupId: '',
      status: 0,
      createdTime: Date.now()
    })
  }

  return {
    taskList: taskList as Ref<ReadonlyDeep<TaskList[]>>,
    createList,
    ...action,
    useStorage: () => useStorage('taskList', taskList)
  }
})
