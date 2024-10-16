import type { SubTask, Task, TaskList, TargetTable, Operation, Commit } from '@ltfei/todo-common'
import { defineStore } from 'pinia'
import { createCommitInstance, updateCommitInstance } from '@/utils/commit'

export const useCommitsStore = defineStore('commitsStore', () => {
  const commits = ref<Commit<SubTask | Task | TaskList>[]>([])

  const createCommit = (
    operation: Operation,
    targetTable: TargetTable,
    data: SubTask | Task | TaskList
  ) => {
    const commit = commits.value.find((e) => {
      return e.data.id == data.id && !e.synced
    })

    if (!commit) {
      const commit = createCommitInstance(operation, targetTable, data)
      commits.value.push(commit)
      return
    }

    updateCommitInstance(commit, operation, data)
  }

  return {
    commits,
    createCommit
  }
})
