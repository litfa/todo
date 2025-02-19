import axiosRequest, { type Response } from '@/utils/request'

export const getQqConnectUrl = (
  uuid: string
): Response<{
  qqLoginUrl: string
}> => {
  return axiosRequest({
    url: '/auth/qqConnectLogin/getQqConnectUrl',
    method: 'post',
    data: {
      uuid
    }
  })
}
export const qqConnectLogin = (
  uuid: string,
  authorizationCode: string
): Response<{
  token: string
  type: 'register' | 'login'
}> => {
  return axiosRequest({
    url: '/login/qqConnectLogin/qqConnectLogin',
    method: 'post',
    data: {
      uuid,
      authorizationCode
    }
  })
}
