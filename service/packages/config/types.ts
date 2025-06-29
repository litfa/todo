import { loginMethod } from '@ltfei/todo-common'

export interface Config {
  app: {
    port: number
    host: string
    cors: string
    baseUrl: string
    jwtSecret: string
    jwtRefreshSecret: string
  }
  login_method: {
    [loginMethod.qqConnect]: {
      enable: boolean
      appid: string
      appkey: string
      redirect_uri: string
    }
    [loginMethod.wxOpen]: {
      enable: boolean
    }
    [loginMethod.wxMiniprogram]: {
      enable: boolean
      appid: string
      secret: string
      /**
       * 要打开的小程序版本。
       * - 正式版为 release
       * - 体验版为 trial
       * - 开发版为 develop
       */
      env_version: 'develop' | 'release' | 'trial'
    }
    [loginMethod.account]: {
      enable: boolean
    }
  }
  sql: {
    type: 'mysql' | 'sqlite'
  }
  mysql: {
    database: string
    host: string
    password: string
    port: number
    username: string
  }
  sqlite: {
    storage: string
  }
}

export type GetConfig = {
  <T extends keyof Config, K extends keyof Config[T]>(
    key: T,
    name: K
  ): Promise<Config[T][K]>
  <T extends keyof Config>(key: T): Promise<Config[T]>
}

export type DeepPartial<T> = {
  [U in keyof T]?: T[U] extends object ? DeepPartial<T[U]> : T[U]
}
