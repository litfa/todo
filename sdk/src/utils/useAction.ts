import type { Operation, SubTask, TargetTable, Task, TaskList } from '@ltfei/todo-common'
import { Create, Delete, Update } from '@ltfei/todo-common'
import type { Action, Data } from '../types'
import type { OptionalExcept } from '../types/common'
import { createCommitInstance, updateCommitInstance } from './commit'
import type { Ref } from 'vue'

export const useAction = <T extends SubTask | Task | TaskList>(
  data: Data,
  targetTable: TargetTable
) => {
  const createCommit = (
    operation: Operation,
    targetTable: TargetTable,
    item: SubTask | Task | TaskList
  ) => {
    const commit = data.commits.value.find((e) => {
      return e.data.id == item.id && !e.synced
    })

    if (!commit) {
      const commit = createCommitInstance(operation, targetTable, item, data.user.value)
      data.commits.value.push(commit)
      return
    }

    updateCommitInstance(commit, operation, item)
  }

  const state = data[targetTable] as Ref<T[]>

  const action: Action<T> = (operation, item, option = {}) => {
    if (!option.notCreateCommit) {
      createCommit(operation, targetTable, item as T)
    }

    if (operation == Create) {
      state.value.push(item as T)
      return item as T
    }
    const i = state.value.findIndex((e) => e.id == item.id)
    if (operation == Delete) {
      const item = state.value[i]
      state.value.splice(i, 1)
      return item as T
    }
    if (operation == Update) {
      state.value[i] = {
        ...state.value[i],
        ...item
      }
      return state.value[i] as T
    }
    return item as T
  }

  const create = (item: T) => {
    return action(Create, item)
  }
  const remove = (id: string) => {
    return action(Delete, {
      id
    })
  }
  const update = (item: OptionalExcept<T, 'id'>) => {
    return action(Update, item)
  }

  const getStateById = (id: string) => {
    return state.value.find((e) => e.id == id)
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
