import { CommitManager } from '../managers/CommitManager'
import { TaskManager } from '../managers/TaskManager'

export class Data {
  protected task: TaskManager
  protected commit: CommitManager
  protected options: { user: number }
  setData(data: { task: TaskManager; commit: CommitManager; options: { user: number } }) {
    this.task = data.task
    this.commit = data.commit
    this.options = data.options
  }
  constructor(data?: {
    task: TaskManager
    commit: CommitManager
    options: { user: number }
  }) {
    data && this.setData(data)
  }
}
