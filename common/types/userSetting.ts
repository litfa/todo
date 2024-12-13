export interface Dev {
  baseUrl: string
  token: string
  vConsole: string
}

export interface Remind {
  enable: boolean
  notificationMethod: number
}

export interface UserSetting {
  dev: Dev
  remind: Remind
}
