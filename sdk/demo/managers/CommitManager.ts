import * as Common from '@ltfei/todo-common'
import { BaseList } from '../core/BaseList'

export class CommitManager extends BaseList<Common.Commit> {
  toJSON(): Object {
    throw new Error('Method not implemented.')
  }
  add(data: Common.Commit): void {
    throw new Error('Method not implemented.')
  }
  remove(id: number): void {
    throw new Error('Method not implemented.')
  }
  update(id: number, data: Common.Commit): void {
    throw new Error('Method not implemented.')
  }
  findxxx(): void {
    throw new Error('Method not implemented.')
  }
}
