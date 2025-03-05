import * as Common from '@ltfei/todo-common'
import { BaseList } from '../core/BaseList'
import { Commit } from '../models/Commit'

export class CommitManager extends BaseList<Commit> {
  override create(data: Commit<Common.Task | Common.SubTask | Common.TaskList>): void {
    this.list.push(data)
  }
}
