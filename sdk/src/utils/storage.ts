import type { Data, Config } from '../types'
import { useLocalStorage } from './localStorage'
import type { Task, TaskList, SubTask, Commit } from '@ltfei/todo-common'
import { watch, toRaw } from 'vue'

export const useStorage = (data: Data, config: Config) => {
  const localStorage = useLocalStorage(config)

  const stores = ['tasks', 'taskList', 'subTasks', 'commits'] as const

  const getLocalStore = async () => {
    const user = data.user.value

    const getItem = async (store: (typeof stores)[number]) => {
      const items = await localStorage.getStore<
        Task[] | TaskList[] | SubTask[] | Commit[]
      >(store, user)

      data[store].value.splice(0, data[store].value.length, ...(items as any))
    }

    await Promise.all(stores.map((store) => getItem(store)))
  }

  const watchData = () => {
    const user = data.user.value

    stores.forEach((store) => {
      watch(
        data[store],
        async (value) => {
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
