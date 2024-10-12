import type { Commit as CommitType } from '@ltfei/todo-common'
import { generateId } from '@/utils/snowflake'

export class Commit<T> implements CommitType<T> {
  readonly commitId: string
  operation: 'create' | 'update' | 'delete'
  targetTable: 'tasks' | 'subTasks' | 'taskList'
  source: string
  user: number
  data: T
  createdTime: number
  lastEditTime: number

  constructor(
    operation: 'create' | 'update' | 'delete',
    targetTable: 'tasks' | 'subTasks' | 'taskList',
    data: T
  ) {
    const commitId = generateId()
    this.commitId = commitId
    this.operation = operation
    this.targetTable = targetTable
    this.data = data
    this.createdTime = Date.now()
    this.lastEditTime = -1
    // todo: 获取来源字符串和用户id
    this.source = 'web'
    this.user = -1
  }

  /**
   * todo:
   * 更新commit
   * @param data
   *
   */
  private update(data: T) {
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
