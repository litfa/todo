import type { OptionalExcept } from './common'
import type { Response } from '../apis/request'
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
import { useSubTask } from '../models/subTask'
import { useTaskList } from '../models/taskList'

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

export type GetItem = <T extends string | Object = string>(
  key: string
) => T | null | Promise<T | null>
export type SetItem = <T extends string | Object = string>(
  key: string,
  value: T
) => void | Promise<void>

export type GetToken = () => string | null | Promise<string | null>

export interface Config {
  storage?: {
    prefix?: string
    key?: (store: string, user: number) => string
    getItem?: GetItem
    setItem?: SetItem
  }
  sync?: {
    baseUrl?: string
    token?: GetToken
    request?: AxiosInstance
    pull?: (
      lastSyncTime: number
    ) => Response<{ commits: Commit<Task | SubTask | TaskList>[]; syncTime: number }>
    push?: (commits: Commit<any>[]) => Response<{
      errCount: number
      results: (
        | { err: true }
        | { err: false; commitId: string; value: string | number }
      )[]
    }>
  }
}

export interface Stores {
  task: ReturnType<typeof useTask>
  subTask: ReturnType<typeof useSubTask>
  taskList: ReturnType<typeof useTaskList>
}

export type Update<T extends { id: string }> = {
  (operation: Operation, data: OptionalExcept<T, 'id'>, option?: Option): void
}
