import {
  SubTask,
  Task,
  TaskList,
  TargetTable,
  Operation,
  Create,
  Delete,
  Update
} from '@ltfei/todo-common'
import { createCommitInstance, updateCommitInstance } from './commit'
import { Data, Action } from '../types'
import { OptionalExcept } from '../types/common'

export const useAction = <T extends SubTask | Task | TaskList>(
  data: Data,
  targetTable: TargetTable
) => {
  const createCommit = (
    operation: Operation,
    targetTable: TargetTable,
    item: SubTask | Task | TaskList
  ) => {
    const commit = data.commits.find((e) => {
      return e.data.id == item.id && !e.synced
    })

    if (!commit) {
      const commit = createCommitInstance(operation, targetTable, item)
      data.commits.push(commit)
      return
    }

    updateCommitInstance(commit, operation, item)
  }

  const state = data[targetTable] as T[]

  const action: Action<T> = (operation, item, option = {}) => {
    if (!option.notCreateCommit) {
      createCommit(operation, targetTable, item as T)
    }

    if (operation == Create) {
      state.push(item as T)
      return
    }
    const i = state.findIndex((e) => e.id == item.id)
    if (operation == Delete) {
      state.splice(i, 1)
      return
    }
    if (operation == Update) {
      state[i] = {
        ...state[i],
        ...item
      }
    }
  }

  const create = (item: T) => {
    action(Create, item)
  }
  const remove = (id: string) => {
    action(Delete, {
      id
    })
  }
  const update = (item: OptionalExcept<T, 'id'>) => {
    action(Update, item)
  }

  const getStateById = (id: string) => {
    return state.find((e) => e.id == id)
  }

  const updateId = (before: string, after: string) => {
    const item = getStateById(before)
    item && (item.id = after)
  }

  return {
    create,
    remove,
    update,
    action,
    getStateById,
    updateId
  }
}
