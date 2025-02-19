import axiosRequest, { type Response } from '@/utils/request'
import { keys } from '@ltfei/todo-common'

export const init = (): Response<{
  uuid: string
  loginMethods: string[]
}> => {
  return axiosRequest({
    url: '/auth/login/init'
  })
}

export const loginStatus = keys.loginQueue.loginStatus

export const getStatus = (uuid: string): Response<{ status: number; token?: string }> => {
  return axiosRequest({
    url: '/login/getStatus',
    method: 'post',
    data: {
      uuid
    }
  })
}
