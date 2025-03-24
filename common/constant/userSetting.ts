import type { UserSetting } from '../types'
import { keys } from '../'

export const defaultUserSetting: UserSetting = {
  dev: {
    baseUrl: '',
    token: '',
    vConsole: '0'
  },
  remind: {
    enable: true,
    notificationMethod: keys.userSetting.Remind.inApp
  },
  more: {
    lang: 'zh-cn'
  }
}
