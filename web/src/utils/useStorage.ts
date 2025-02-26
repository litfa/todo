import type { Ref } from 'vue'
import localforage from 'localforage'

const prefix = 'todo_'
const getStoreKey = (storeId: string) => `${prefix}${storeId}`

type StorageType = 'localforage' | 'localStorage'
const useLocalStorage = (type: StorageType) => {
  if (type == 'localforage') {
    return localforage
  } else {
    return localStorage
  }
}

export const useStorage = async (
  key: string,
  refValue: Ref,
  storageType: StorageType = 'localforage'
) => {
  const storage = useLocalStorage(storageType)
  const data = await storage.getItem(getStoreKey(key))

  if (data) {
    refValue.value = data
  }

  watch(
    refValue,
    async (value) => {
      storage.setItem(getStoreKey(key), toRaw(value))
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
  useTasksStore,
  useUserSetting
} from '@/stores'

export const useStoreStorage = async () => {
  const commits = useCommitsStore()
  const subTasks = useSubTasksStore()
  // const taskGroup = useTaskGroupStore()
  const tasksList = useTasksListStore()
  const tasks = useTasksStore()
  const userSetting = useUserSetting()

  await Promise.allSettled([
    commits.useStorage(),
    subTasks.useStorage(),
    // taskGroup.useStorage(),
    tasksList.useStorage(),
    tasks.useStorage(),
    userSetting.useStorage()
  ])
}
