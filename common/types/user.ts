export type User = {
  id: number
  username: string
  password: string
  avatar: string
  city: string
  /**
   * 0 女
   * 1 男
   * 2 保密
   */
  gender: 0 | 1 | 2
  registerDate: number
  lastLoginDate: number
  registerIp: string
  status: number
  avatarPendant: string
  desc: string
  wxOpenid: string
  wxUnionid: string
  qqOpenid: string
}
