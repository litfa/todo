import * as Common from '@ltfei/todo-common'
import { BaseItem } from '../core/BaseItem'

/**
 * @deprecated
 */
export class Commit<T = Common.Task | Common.SubTask | Common.TaskList>
  extends BaseItem
  implements Common.Commit<T>
{
  commitId: string
  operation: Common.Operation
  targetTable: Common.TargetTable
  source: string
  user: number
  data: T
  createdTime: number
  lastEditTime: number
  syncTime?: number
  synced?: boolean
  constructor(data: Common.Commit) {
    super()
    this.setData(data)
  }
  setData(data: Common.Commit) {
    for (const i in data) {
      const index = i as keyof Common.Commit
      this[index] = data[index] as never
    }
  }
  toJSON() {
    return this
  }
}
