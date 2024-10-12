import type { SubTask, Task, TaskList } from '@ltfei/todo-common'
import { defineStore } from 'pinia'
import { Commit } from '@/utils/commit'

export const useCommitsStore = defineStore('commitsStore', () => {
  const commits = ref<Commit<SubTask | Task | TaskList>[]>([])

  const createCommit = (commit: Commit<SubTask | Task | TaskList>) => {
    commits.value.push(commit)
  }

  return {
    commits,
    createCommit
  }
})
