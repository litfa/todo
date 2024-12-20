import type { Ref } from 'vue'
import localforage from 'localforage'

const prefix = 'todo_'
const getStoreKey = (storeId: string) => `${prefix}${storeId}`

export const useStorage = async (key: string, refValue: Ref) => {
  const data = await localforage.getItem(getStoreKey(key))

  if (data) {
    refValue.value = data
  }

  watch(
    refValue,
    async (value) => {
      localforage.setItem(getStoreKey(key), toRaw(value))
    },
    {
      deep: true
    }
  )
}

import {
  useCommitsStore,
  useSubTasksStore,
  // useTaskGroupStore,
  useTasksListStore,
  useTasksStore
} from '@/stores'

export const useStoreStorage = async () => {
  const commits = useCommitsStore()
  const subTasks = useSubTasksStore()
  // const taskGroup = useTaskGroupStore()
  const tasksList = useTasksListStore()
  const tasks = useTasksStore()

  await Promise.allSettled([
    commits.useStorage(),
    subTasks.useStorage(),
    // taskGroup.useStorage(),
    tasksList.useStorage(),
    tasks.useStorage()
  ])
}
