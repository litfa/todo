import type { TaskList } from '@ltfei/todo-common'
import { defineStore } from 'pinia'
import { generateId } from '../utils/snowflake'
import type { ReadonlyDeep } from '@/types'
import { useAction } from '@/utils/useAction'

export const useTasksListStore = defineStore('taskList', () => {
  const taskList = ref<TaskList[]>([])

  const action = useAction(taskList, 'taskList')

  const createList = (name: string) => {
    const id = generateId()
    action('create', {
      id: id,
      createdWithLocalId: id,
      isSharedFolder: false,
      owner: '',
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

  return { tasks: taskList as Ref<ReadonlyDeep<TaskList[]>>, createList, action }
})
