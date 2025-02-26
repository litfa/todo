import request, { type Response } from '@/utils/request'
import type { User } from '@ltfei/todo-common'

export const getUserInfo = (): Response<Omit<User, 'password'>> => {
  return request({
    url: '/user/userInfo',
    method: 'get'
  })
}
