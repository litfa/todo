import type { TaskList } from '@ltfei/todo-common'
import { useAction } from '../utils/useActio'
import type { Data } from '../types'
import { generateIdWithSource } from '@/utils/snowflake'

export const useTaskList = (data: Data) => {
  const taskList = useAction<TaskList>(data, 'taskList')

  const createList = (name: string) => {
    const id = generateIdWithSource()
    taskList.create({
      id: id,
      createdWithLocalId: id,
      isSharedFolder: false,
      owner: 1,
      name,
      sharingLink: '',
      showCompletedTasks: true,
      sortAscending: false,
      sortType: '',
      themeBackground: '',
      themeColor: '',
      parentFolderGroupId: '',
      status: 0,
      createdTime: Date.now(),
      lastEditTime: 0
    })
  }

  return {
    createList,
    ...taskList
  }
}
