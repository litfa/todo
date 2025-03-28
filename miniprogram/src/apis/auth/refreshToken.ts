import { request } from '@/apis/request'

export const refreshToken = (refreshToken: string) => {
  return request<{
    userToken: string
    refreshToken: string
  }>({
    url: '/auth/refreshToken',
    method: 'POST',
    data: {
      refreshToken
    }
  })
}
