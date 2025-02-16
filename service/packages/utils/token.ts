import jwt, { JwtPayload } from 'jsonwebtoken'
import { getConfig } from '@/config'
import type { TokenUser } from '@/app/types'

/**
 * 生成用户令牌
 */
export const createUserToken = async (user: TokenUser) => {
  const secret = await getConfig('app', 'jwtSecret')
  return jwt.sign(user, secret, {
    // todo: 登录有效期配置项
    expiresIn: '1d'
  })
}

/**
 * 生成长效刷新令牌
 */
export const createRefreshToken = async (user: TokenUser) => {
  const secret = await getConfig('app', 'jwtRefreshSecret')
  return jwt.sign(user, secret, {
    expiresIn: '30d'
  })
}

/**
 * 验证刷新令牌
 */
export const verifyRefreshToken = async (token: string) => {
  const secret = await getConfig('app', 'jwtRefreshSecret')

  try {
    return jwt.verify(token, secret) as TokenUser & JwtPayload
  } catch {
    return false
  }
}
