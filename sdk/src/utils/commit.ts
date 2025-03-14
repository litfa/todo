import type {
  Commit as CommitType,
  Operation,
  SubTask,
  TargetTable,
  Task,
  TaskList
} from '@ltfei/todo-common'
import { Create, Delete, generateIdString } from '@ltfei/todo-common'

export const createCommitInstance = <T extends Task | SubTask | TaskList>(
  operation: Operation,
  targetTable: TargetTable,
  data: T,
  user: number
): CommitType => {
  const commitId = generateIdString()
  return {
    commitId: commitId,
    operation: operation,
    targetTable: targetTable,
    data: data as T,
    createdTime: Date.now(),
    lastEditTime: -1,
    // todo: 获取来源字符串
    source: 'web',
    user,
    synced: false
  }
}

export const updateCommitInstance = <T>(
  source: CommitType<T>,
  operation: Operation,
  data: T
) => {
  source.lastEditTime = Date.now()

  if (operation == Delete) {
    if (source.operation == Create) {
      source.synced = true
    }
    source.operation = operation
    return
  }

  source.data = {
    ...source.data,
    ...data
  }

  return source
}
