import { request, upload } from './request'

export const uploadAvatar = (filePath: string) => {
  return upload<{
    filename: string
    path: string
    url: string
  }>({
    url: '/user/avatar',
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
    url: '/user/editUserInfo',
    data,
    method: 'POST'
  })
}
