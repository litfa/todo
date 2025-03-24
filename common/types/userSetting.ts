export interface Dev {
  baseUrl: string
  token: string
  vConsole: string
}

export interface Remind {
  enable: boolean
  notificationMethod: number
}

export type Lang = 'zh-cn' | 'en'

export interface More {
  lang: Lang
}

export interface UserSetting {
  dev: Dev
  remind: Remind
  more: More
}
