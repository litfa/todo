import { request, upload } from './request'

export const uploadAvatar = (filePath: string) => {
  return upload<{
    filename: string
    path: string
    url: string
  }>({
    url: '/users/avatar',
    name: 'file',
    filePath
  })
}

export const editUserInfo = (data: {
  username?: string
  avatar?: string
  city?: string
  gender?: string
}) => {
  return request({
    url: '/users/editUserInfo',
    data,
    method: 'POST'
  })
}
