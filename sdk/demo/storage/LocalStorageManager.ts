import localforage from 'localforage'
import * as Common from '@ltfei/todo-common'
import { Task } from '../models/Task'

export class LocalStorageManager {
  private constructor() {}
  readonly StorageKeyPrefix = 'todo'
  getStorageKey(store: string, user: number) {
    return `${this.StorageKeyPrefix}_${store}_${user}`
  }
  setItem(key: string, value: string) {
    return localforage.setItem(key, value)
  }
  getItem<T>(key: string): Promise<T> {
    return localforage.getItem(key)
  }
  clear() {
    return localforage.clear()
  }

  async loadTaskData(user: number) {
    const data = await this.getItem<Common.Task[]>(this.getStorageKey('task', user))
    return data.map((e) => {
      return new Task(e)
    })
  }
}
