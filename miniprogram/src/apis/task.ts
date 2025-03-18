import { request } from './request'
import type { Commit } from '@ltfei/todo-common'

export const pull = (lastSyncTime: number) => {
  return request<{
    commits: Commit[]
    syncTime: number
  }>({
    url: '/task/pull',
    method: 'POST',
    data: {
      lastSyncTime
    }
  })
}

export const push = (commits: Commit<any>[]) => {
  return request<{
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
  }>({
    url: '/task/push',
    method: 'POST',
    data: {
      commits
    }
  })
}
