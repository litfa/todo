import * as Common from '@ltfei/todo-common'
import { BaseList } from '../core/BaseList'
import { generateIdString } from '../utils/snowflake'

export class CommitManager extends BaseList<Common.Commit> {
  targetTable: Common.TargetTable
  override create(data: Common.Commit): void {
    this.list.push(data)
  }

  /**
   * 创建commit
   * 同一记录的多次修改将被合并为一次 commit
   */
  public createCommit(
    operation: Common.Operation,
    targetTable: Common.TargetTable,
    data: Common.SubTask | Common.Task | Common.TaskList
  ) {
    const commit = this.list.find((e) => {
      return e.data.id == data.id && !e.synced
    })

    if (!commit) {
      const commit = this.createCommitInstance(operation, targetTable, data)
      this.list.push(commit)
      return
    }

    this.updateCommitInstance(commit, operation, data)
  }
  /**
   * 创建commit实例
   */
  private createCommitInstance<T>(
    operation: Common.Operation,
    targetTable: Common.TargetTable,
    data: T
  ) {
    const commitId = generateIdString()
    return {
      commitId: commitId,
      operation: operation,
      targetTable: targetTable,
      data: data,
      createdTime: Date.now(),
      lastEditTime: -1,
      source: 'web',
      user: 1,
      synced: false
    }
  }
  /**
   * 更新已经存在的commit实例
   */
  private updateCommitInstance<T>(
    source: Common.Commit<T>,
    operation: Common.Operation,
    data: T
  ) {
    source.lastEditTime = Date.now()

    if (operation == Common.Delete) {
      if (source.operation == Common.Create) {
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
}
