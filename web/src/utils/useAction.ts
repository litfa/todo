import type { Action } from '@/types/'
import { useCommitsStore } from '@/stores/'
import type { TargetTable } from '@ltfei/todo-common'
import { Create, Update, Delete } from '@ltfei/todo-common'
import type { SubTask, Task, TaskList } from '@ltfei/todo-common'

export const useAction = <T extends SubTask | Task | TaskList>(
  state: Ref<T[]>,
  targetTable: TargetTable
) => {
  const commitsStore = useCommitsStore()

  const action: Action<T> = (operation, data, option = {}) => {
    if (!option.notCreateCommit) {
      commitsStore.createCommit(operation, targetTable, data as T)
    }

    if (operation == Create) {
      state.value.push(data as T)
      return
    }
    const i = state.value.findIndex((e) => e.id == data.id)
    if (operation == Delete) {
      state.value.splice(i, 1)
      return
    }
    if (operation == Update) {
      state.value[i] = {
        ...state.value[i],
        ...data
      }
    }
  }

  const updateId = (before: string, after: string) => {
    const el = state.value.find((e) => e.id == before)
    if (!el) {
      return false
    }
    el.id = after
    return true
  }

  return {
    action,
    updateId
  }
}
