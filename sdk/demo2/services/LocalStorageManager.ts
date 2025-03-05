import { Commit } from '../models/Commit'
import { Task } from '../models/Task'
import { LocalStorage } from './LocalStorage'
import * as Common from '@ltfei/todo-common'

export class LocalStorageManager extends LocalStorage {
  readonly stores = ['task', 'subTask', 'taskList'] as const
  /**
   * 加载本地存储的数据
   */
  async load(user: number) {
    console.log(user)
    const data = await this.getStore<Common.Task[]>('task', user)
    this.task.setList(data.map((e) => new Task(e)))
    console.log('load')

    // const res = await Promise.all([
    //   async () => {

    //   },
    //   async () => {
    //     const data = await this.getStore<Common.Commit[]>('commit', user)
    //     this.commit.setList(data.map((e) => new Commit(e)))
    //   }
    // ])
    // console.log()
  }
  save() {}
}
