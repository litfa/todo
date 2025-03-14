import type { Data, Config } from '../types'
import { useLocalStorage } from './localStorage'
import type { Task, TaskList, SubTask, Commit } from '@ltfei/todo-common'
import { watch, toRaw } from 'vue'

export const useStorage = (data: Data, config: Config) => {
  const localStorage = useLocalStorage(config)

  const stores: (keyof Data)[] = [
    'tasks',
    'taskList',
    'subTasks',
    'commits',
    'lastSyncTime'
  ]

  const getLocalStore = async () => {
    const getItem = async (store: (typeof stores)[number]) => {
      const user = data.user.value
      const items = await localStorage.getStore<
        Task[] | TaskList[] | SubTask[] | Commit[]
      >(store, user)

      if (!items) {
        return
      }

      data[store].value = items
    }

    await Promise.all(stores.map((store) => getItem(store)))
  }

  const watchData = () => {
    stores.forEach((store) => {
      watch(
        data[store],
        async (value) => {
          const user = data.user.value
          await localStorage.setStore(store, user, toRaw(value))
        },
        {
          deep: true
        }
      )
    })
  }
  watchData()

  return {
    getLocalStore
  }
}
