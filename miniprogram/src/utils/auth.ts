import Taro from '@tarojs/taro'
import { refreshToken as refreshTokenApi } from '../apis/auth/refreshToken'

export const storageKey = {
  refreshToken: 'refreshToken',
  userToken: 'token'
}

const token = new Map<keyof typeof storageKey, string | null>()

const storage = {
  async getItem(key: string) {
    try {
      const res = await Taro.getStorage({ key })
      return res.data as string
    } catch {
      return null
    }
  },
  async setItem(key: string, value: string) {
    try {
      const result = await Taro.setStorage({
        data: value,
        key
      })

      return result
    } catch {
      return false
    }
  },
  async removeItem(key: string) {
    try {
      const result = await Taro.removeStorage({
        key
      })
      return result
    } catch {
      return false
    }
  }
}

/**
 * 刷新令牌
 */
export const refreshToken = async () => {
  const refreshToken = await storage.getItem(storageKey.refreshToken)

  if (!refreshToken) {
    return false
  }
  const { status, data } = await refreshTokenApi(refreshToken)

  if (status == 401) {
    return false
  }

  await setToken({
    refreshToken: data.refreshToken,
    userToken: data.userToken
  })

  return true
}

export const setToken = async (token: { refreshToken?: string; userToken?: string }) => {
  token.refreshToken &&
    (await storage.setItem(storageKey.refreshToken, token.refreshToken))
  token.userToken && (await storage.setItem(storageKey.userToken, token.userToken))
}

export const deleteToken = async () => {
  storage.removeItem(storageKey.refreshToken)
  await storage.removeItem(storageKey.userToken)
  token.clear()
}

export const getUserToken = async () => {
  return token.get('userToken') || (await storage.getItem(storageKey.userToken))
}
export const getRefreshToken = async () => {
  return token.get('refreshToken') || (await storage.getItem(storageKey.refreshToken))
}

// const init = () => {
//   token.set('userToken', getUserToken())
//   token.set('refreshToken', getUserToken())
// }
