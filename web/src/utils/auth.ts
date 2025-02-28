import { refreshToken as refreshTokenApi } from '@/apis/auth/refreshToken'

export const storageKey = {
  refreshToken: 'refreshToken',
  userToken: 'token'
} as const

const token = new Map<(typeof storageKey)[keyof typeof storageKey], string | null>()

/**
 * 刷新令牌
 */
export const refreshToken = async () => {
  const refreshToken = localStorage.getItem(storageKey.refreshToken)

  if (!refreshToken) {
    return false
  }
  const { status, data } = await refreshTokenApi(refreshToken)

  if (status == 401) {
    return false
  }

  setToken({
    refreshToken: data.refreshToken,
    userToken: data.userToken
  })

  return true
}

export const setToken = (data: { refreshToken?: string; userToken?: string }) => {
  if (data.refreshToken) {
    localStorage.setItem(storageKey.refreshToken, data.refreshToken)
    token.set(storageKey.refreshToken, data.refreshToken)
  }
  if (data.userToken) {
    localStorage.setItem(storageKey.userToken, data.userToken)
    token.set(storageKey.userToken, data.userToken)
  }
}

export const deleteToken = () => {
  localStorage.removeItem(storageKey.refreshToken)
  localStorage.removeItem(storageKey.userToken)
  token.clear()
}

export const getUserToken = () => {
  return token.get(storageKey.userToken) || localStorage.getItem(storageKey.userToken)
}
export const getRefreshToken = () => {
  return token.get(storageKey.refreshToken) || localStorage.getItem(storageKey.refreshToken)
}

export const hasToken = () => {
  return Boolean(getUserToken() || getRefreshToken())
}

token.set(storageKey.userToken, getUserToken())
token.set(storageKey.refreshToken, getUserToken())
