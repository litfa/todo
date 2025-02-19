import { request } from './request'

export const getUserinfo = () => {
  return request<{
    id: number
    username: string
    avatar: string
    city?: any
    gender?: any
    register_date: string
    last_login_date?: any
    status?: any
    avatar_pendant?: any
  }>({
    url: '/users/userInfo',
    method: 'POST'
  })
}
