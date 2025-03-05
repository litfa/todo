import * as Common from '@ltfei/todo-common'
import { BaseList } from '../core/BaseList'

export class Commit implements Common.Commit {
  commitId: string
  operation: Common.Operation
  targetTable: Common.TargetTable
  source: string
  user: number
  data: Common.Task | Common.SubTask | Common.TaskList
  createdTime: number
  lastEditTime: number
  syncTime?: number
  synced?: boolean

  toJSON() {
    return this
  }
}
