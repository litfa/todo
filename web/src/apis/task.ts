import request from '@/utils/request'
import type { Commit } from '@ltfei/todo-common'

export const pull = (lastSyncTime: number) => {
  return request({
    url: '/task/pull',
    data: {
      lastSyncTime
    }
  })
}

export const push = (data: Commit<any>[]) => {
  return request({
    url: '/task/pull',
    data
  })
}
