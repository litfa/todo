import type { Commit as CommitType, TargetTable, Operation } from '@ltfei/todo-common'
import { Delete, Create } from '@ltfei/todo-common'
import { generateIdString } from '@/utils/snowflake'

export const createCommitInstance = <T>(
  operation: Operation,
  targetTable: TargetTable,
  data: T
) => {
  const commitId = generateIdString()
  return {
    commitId: commitId,
    operation: operation,
    targetTable: targetTable,
    data: data,
    createdTime: Date.now(),
    lastEditTime: -1,
    // todo: 获取来源字符串和用户id
    source: 'web',
    user: -1,
    synced: false
  }
}

export const updateCommitInstance = <T>(source: CommitType<T>, operation: Operation, data: T) => {
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

/**
 * @deprecated 用类不适合在store中持久化存储
 */
export class Commit<T> implements CommitType<T> {
  readonly commitId: string
  operation: Operation
  targetTable: TargetTable
  source: string
  user: number
  data: T
  readonly createdTime: number
  lastEditTime: number
  synced: boolean

  constructor(operation: Operation, targetTable: TargetTable, data: T) {
    const commitId = generateIdString()
    this.commitId = commitId
    this.operation = operation
    this.targetTable = targetTable
    this.data = data
    this.createdTime = Date.now()
    this.lastEditTime = -1
    // todo: 获取来源字符串和用户id
    this.source = 'web'
    this.user = -1
    this.synced = false
  }

  /**
   * 更改 commit
   * 将同一记录的多次修改合并为一次 commit
   * @param data
   *
   */
  public update(operation: Operation, data: T) {
    this.lastEditTime = Date.now()

    if (operation == Delete) {
      if (this.operation == Create) {
        this.synced = true
      }
      this.operation = operation
      return
    }

    this.data = {
      ...this.data,
      ...data
    }
  }

  public toJson(): CommitType<T> {
    return {
      commitId: this.commitId,
      operation: this.operation,
      targetTable: this.targetTable,
      source: this.source,
      user: this.user,
      data: this.data,
      createdTime: this.createdTime,
      lastEditTime: this.lastEditTime
    }
  }
}
