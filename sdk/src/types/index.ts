import type { OptionalExcept } from './common'

import type {
  Task,
  TaskList,
  SubTask,
  Commit,
  Create,
  Delete,
  Update,
  Operation
} from '@ltfei/todo-common'
import type { AxiosInstance } from 'axios'
import type { Ref } from 'vue'
import { useTask } from '../models/task'

export interface Data {
  tasks: Ref<Task[]>
  taskList: Ref<TaskList[]>
  subTasks: Ref<SubTask[]>
  commits: Ref<Commit[]>
  user: Ref<number>
  isSynchronizing: Ref<boolean>
  syncError: Ref<boolean>
  lastSyncTime: Ref<number>
}

export interface Option {
  notCreateCommit?: boolean
}

export type Action<T extends { id: string }> = {
  (operation: typeof Create, data: T, option?: Option): void
  (operation: typeof Delete, data: { id: string }, option?: Option): void
  (operation: typeof Update, data: OptionalExcept<T, 'id'>, option?: Option): void
}

/**
 * storage: {
    prefix: '',
    key: () => {},
    getItem: () => {},
    setItem: () => {}
  },
  sync: {
    token: '' || () => {}
    request: xxx,
    pull: xxx
  }
 */
export interface Config {
  storage?: {
    prefix?: string
    key?: (store: string, user: number) => string
    getItem?: <T extends string | Object = string>(key: string) => T | Promise<T>
    setItem?: <T extends string | Object = string>(
      key: string,
      value: T
    ) => void | Promise<void>
  }
  // sync: {
  //   token: string | (() => string),
  //   request: AxiosInstance,
  //   pull: () => void
  //   push: () => void
  // }
}

export interface Stores {
  task: ReturnType<typeof useTask>
}

export type Update<T extends { id: string }> = {
  (operation: Operation, data: OptionalExcept<T, 'id'>, option?: Option): void
}
