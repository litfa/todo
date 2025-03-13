import type { Config } from '../types'
import localforage from 'localforage'

export const useLocalStorage = (config: Config) => {
  const prefix = config?.storage?.prefix ?? 'todo'

  const getStoreKey = (store: string, user: number) => {
    if (config?.storage?.key) {
      return config.storage.key(store, user)
    }
    return `${prefix}_${store}_${user}`
  }

  const defaultGetItem: Config['storage']['getItem'] = <Object>(key: string) => {
    return localforage.getItem<Object>(key)
  }

  const defaultSetItem: Config['storage']['setItem'] = async <Object>(
    key: string,
    value: Object
  ) => {
    await localforage.setItem<Object>(key, value)
    return
  }

  const toJSON = <T = string | Object>(data: T): T => {
    if (typeof data === 'string') {
      try {
        return JSON.parse(data)
      } catch (e) {
        return data
      }
    }
    return data
  }

  const getStore = <T>(store: string, user: number) => {
    const getItem = config?.storage?.getItem || defaultGetItem
    return toJSON(getItem<T>(getStoreKey(store, user)))
  }

  const setStore = async <T>(store: string, user: number, value: T) => {
    const setItem = config?.storage?.setItem || defaultSetItem
    await setItem<T>(getStoreKey(store, user), value)
  }

  return {
    getItem: config?.storage?.getItem || defaultGetItem,
    setItem: config?.storage?.setItem || defaultSetItem,
    getStore,
    setStore
  }
}
