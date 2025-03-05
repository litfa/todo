import * as Common from '@ltfei/todo-common'
import { Data } from './data'

type Models = Common.Task | Common.TaskList | Common.SubTask | Common.Commit

export abstract class BaseList<T extends Models> extends Data {
  readonly list: T[]
  abstract readonly targetTable: Common.TargetTable
  constructor(data: T[]) {
    super()
    this.list = data
  }
  setList(data: T[]) {
    console.log('setList', data)

    this.list.splice(0, Infinity, ...data)
  }
  /**
   * 创建数据，并新建commit
   */
  create(data: Exclude<T, Common.Commit>) {
    this.commit.createCommit(Common.Create, this.targetTable, data)
  }
}
