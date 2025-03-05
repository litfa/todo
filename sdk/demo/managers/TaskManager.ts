import { BaseList } from '../core/BaseList'
import { Task } from '../models/Task'

export class TaskManager extends BaseList<Task> {
  toJSON() {
    return this.list.value.map((e) => e.toJSON())
  }
  setList(data: Task[]) {
    this.list.value = data
  }
  add(data: Task): void {}
  remove(id: number): void {
    throw new Error('Method not implemented.')
  }
  update(id: number, data: Partial<Task>): void {
    throw new Error('Method not implemented.')
  }
  findxxx(): void {
    throw new Error('Method not implemented.')
  }
}
