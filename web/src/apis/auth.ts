import request, { type Response } from '@/utils/request'

export const refreshToken = (
  refreshToken: string
): Response<{
  userToken: string
  refreshToken: string
}> => {
  return request({
    url: '/auth/refreshToken',
    method: 'POST',
    data: {
      refreshToken
    }
  })
}
