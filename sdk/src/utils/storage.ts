import { Data, Config } from '../types'
import { useLocalStorage } from './localStorage'
import { Task, TaskList, SubTask, Commit } from '@ltfei/todo-common'
import { watch } from 'vue'

export const useStorage = (data: Data, config: Config) => {
  const localStorage = useLocalStorage(config)

  const stores = ['tasks', 'taskList', 'subTasks', 'commits'] as const

  const getLocalStore = async () => {
    const user = data.user.value

    const getItem = async (store: (typeof stores)[number]) => {
      const items = await localStorage.getStore<
        Task[] | TaskList[] | SubTask[] | Commit[]
      >(store, user)

      data[store].splice(0, data[store].length, ...(items as any))
    }

    await Promise.all(stores.map((store) => getItem(store)))
  }

  const watchData = () => {
    const user = data.user.value

    stores.forEach((store) => {
      watch(data[store], async () => {
        console.log('setitem')

        await localStorage.setStore(store, user, data[store])
      })
    })
  }
  watchData()

  return {
    getLocalStore
  }
}
