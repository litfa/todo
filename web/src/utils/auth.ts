import { refreshToken as refreshTokenApi } from '@/apis/auth/refreshToken'

export const storageKey = {
  refreshToken: 'refreshToken',
  userToken: 'token'
}

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
