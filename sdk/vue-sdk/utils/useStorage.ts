import localforage from 'localforage'
import { toRaw, watch, type Ref } from 'vue'

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
