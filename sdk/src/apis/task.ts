import request, { type Response } from './request'
import type { Commit } from '@ltfei/todo-common'

export const pull = (
  lastSyncTime: number
): Response<{
  commits: Commit[]
  syncTime: number
}> => {
  return request({
    url: '/task/pull',
    method: 'POST',
    data: {
      lastSyncTime
    }
  })
}

export const push = (
  commits: Commit<any>[]
): Response<{
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
}> => {
  return request({
    url: '/task/push',
    method: 'POST',
    data: {
      commits
    }
  })
}
