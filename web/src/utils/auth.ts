import { refreshToken as refreshTokenApi } from '@/apis/auth/refreshToken'

export const storageKey = {
  refreshToken: 'refreshToken',
  userToken: 'token'
}

const token = new Map<keyof typeof storageKey, string | null>()

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

export const setToken = (token: { refreshToken?: string; userToken?: string }) => {
  token.refreshToken && localStorage.setItem(storageKey.refreshToken, token.refreshToken)
  token.userToken && localStorage.setItem(storageKey.userToken, token.userToken)
}

export const deleteToken = () => {
  localStorage.removeItem(storageKey.refreshToken)
  localStorage.removeItem(storageKey.userToken)
  token.clear()
}

export const getUserToken = () => {
  return token.get('userToken') || localStorage.getItem(storageKey.userToken)
}
export const getRefreshToken = () => {
  return token.get('refreshToken') || localStorage.getItem(storageKey.refreshToken)
}

token.set('userToken', getUserToken())
token.set('refreshToken', getUserToken())
