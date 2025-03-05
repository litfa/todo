import { CommitManager } from '../managers/CommitManager'
import { TaskManager } from '../managers/TaskManager'

export class Data {
  protected task: TaskManager
  protected commit: CommitManager
  protected user: number
  setData(data: { task: TaskManager; commit: CommitManager; user: number }) {
    this.task = data.task
    this.commit = data.commit
    this.user = data.user
  }
  constructor(data?: { task: TaskManager; commit: CommitManager; user: number }) {
    data && this.setData(data)
  }
}
