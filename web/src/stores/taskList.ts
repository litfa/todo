import type { TaskList } from '@ltfei/todo-common'
import { defineStore } from 'pinia'
import { generateId } from '../utils/snowflake'
import type { StoreCommit, ReadonlyDeep } from '@/types'
import { Commit } from '@/utils/commit'
import { useCommitsStore } from './commits'

export const useTasksListStore = defineStore('taskList', () => {
  const tasks = ref<TaskList[]>([])

  const commitsStore = useCommitsStore()
  const commit: StoreCommit<TaskList> = (type, data) => {
    commitsStore.createCommit(new Commit<TaskList>(type, 'tasks', data as TaskList))
    if (type == 'create') {
      tasks.value.push(data as TaskList)
      return
    }
    const i = tasks.value.findIndex((e) => e.id == data.id)
    if (type == 'delete') {
      tasks.value.splice(i, 1)
      return
    }
    if (type == 'update') {
      tasks.value[i] = {
        ...tasks.value[i],
        ...(data as TaskList)
      }
    }
  }

  const createList = (name: string) => {
    const id = generateId()
    commit('create', {
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

  return { tasks: tasks as Ref<ReadonlyDeep<TaskList[]>>, createList, commit }
})
