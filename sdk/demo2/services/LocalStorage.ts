import localforage from 'localforage'
import { Data } from '../core/data'

export class LocalStorage extends Data {
  // private constructor() {}
  readonly StorageKeyPrefix = 'todo'
  getStorageKey(store: string, user: number) {
    return `${this.StorageKeyPrefix}_${store}_${user}`
  }
  /**
   * 本地存储数据
   * 重写时，如不支持JSON，需要手动转换类型
   */
  setItem<T>(key: string, value: T) {
    return localforage.setItem(key, value)
  }
  getItem<T>(key: string): Promise<T> {
    console.log('get')

    return localforage.getItem(key)
  }
  /**
   * 获取本地存储的数据，并自动转换为json
   */
  async getStore<T>(store: string, user: number): Promise<T> {
    console.log('store', 'user')

    const data = await this.getItem<T>(this.getStorageKey(store, user))
    if (typeof data == 'string') {
      try {
        return JSON.parse(data)
      } catch {
        return data
      }
    }
    return data
  }
  clear() {
    return localforage.clear()
  }
}
