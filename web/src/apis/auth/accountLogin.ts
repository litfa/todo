import request, { type Response } from '@/utils/request'
import { SHA256 } from 'crypto-js'

export const accountLogin = (
  email: string,
  password: string
): Response<{
  usertToken?: string
  refreshToken?: string
}> => {
  return request({
    url: '/auth/accountLogin/login',
    method: 'post',
    data: {
      email,
      password: SHA256(password).toString()
    }
  })
}
