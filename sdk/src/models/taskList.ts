import type { TaskList } from '@ltfei/todo-common'
import { useAction } from '../utils/useAction'
import type { Data } from '../types'
import { generateIdWithSource } from '@ltfei/todo-common'

export const useTaskList = (data: Data) => {
  const taskList = useAction<TaskList>(data, 'taskList')

  const createList = (name: string) => {
    const id = generateIdWithSource()
    return taskList.create({
      id: id,
      createdWithLocalId: id,
      isSharedFolder: false,
      owner: data.user.value,
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

  const updateId = (before: string, after: string) => {
    taskList.updateId(before, after)
    data.tasks.value.forEach((task) => {
      if (task.parentFolderId == before) {
        task.parentFolderId = after
      }
    })
  }

  return {
    createList,
    ...taskList,
    updateId
  }
}
