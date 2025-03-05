// import { Ref } from 'vue'
import { Commit } from '../models/Commit'
import { Task } from '../models/Task'
import { Data } from './data'
import * as Common from '@ltfei/todo-common'

// type Models = Common.Task | Common.TaskList | Common.SubTask

export class BaseList<T extends Task | Commit> extends Data {
  readonly list: T[]
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
  create(data: T) {
    console.log(data)
    console.log(this.list)

    console.log(this.list.push(data))
    console.log(this.list)

    /**
     * todo: commit 查重
     */

    const commit = new Commit({
      commitId: '',
      operation: Common.Create,
      targetTable: 'tasks',
      source: 'web',
      user: this.user,
      // @ts-ignore
      data: data.toJSON(),
      createdTime: Date.now(),
      lastEditTime: 0,
      // syncTime: '',
      synced: false
    })
    console.log('commit', commit)

    this.commit.create(commit)
  }
}
