import type { Config } from '../types'
import { Requset, type Response } from './request'
import type { Commit } from '@ltfei/todo-common'

export class TaskApi {
  Requset: Requset

  constructor(config: Config) {
    this.Requset = new Requset(config)

    if (config?.sync?.pull) {
      this.pull = config.sync.pull
    }
    if (config?.sync?.push) {
      this.push = config.sync.push
    }
  }

  pull(lastSyncTime: number): Response<{
    commits: Commit[]
    syncTime: number
  }> {
    return this.Requset.request({
      url: '/task/pull',
      method: 'POST',
      data: {
        lastSyncTime
      }
    })
  }

  push(commits: Commit<any>[]): Response<{
    errCount: number
    results: (
      | {
          err: true
        }
      | {
          err: false
          commitId: string
          value: number | string
        }
    )[]
  }> {
    return this.Requset.request({
      url: '/task/push',
      method: 'POST',
      data: {
        commits
      }
    })
  }
}
