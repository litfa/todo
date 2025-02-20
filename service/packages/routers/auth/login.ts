import { LoginQueue } from '@/db'
import { getConfig } from '@/config'
import { Router } from 'express'
import { checkUuid, generateRandomString } from '@/utils/loginApi'
import type { LoginRequest } from '@/app/types'
import { createToken } from '@/utils/token'
import { keys } from '@ltfei/todo-common'

const router = Router()

const { loginStatus } = keys.loginQueue

/**
 * init 路由
 * 返回登录方式、登录id（二维码和登录地址单独返回）
 */
router.get('/init', async (req, res) => {
  const { url } = req.body

  const loginMethodConfig = await getConfig('login_method')

  // 过滤允许的登录方式
  const loginMethods = Object.keys(loginMethodConfig)
    .map((e) => {
      if (loginMethodConfig[e as keyof typeof loginMethodConfig].enable) {
        return e
      }
    })
    .filter((e) => e)

  const uuid = generateRandomString()
  await LoginQueue.create({
    status: loginStatus.notLogin,
    date: Date.now(),
    url,
    uuid,
    ineffective: false
  })

  res.send({
    status: 200,
    data: {
      uuid,
      loginMethods
    }
  })
})

/**
 * 前端轮询登陆状态
 * 验证uuid是否有效，并返回状态
 */
router.post('/getStatus', checkUuid(), async (req: LoginRequest, res) => {
  const { uuid } = req.body
  if (!uuid) {
    return res.send({
      status: 403
    })
  }

  const { status, user_id } = req.LoginQueue

  // 登录成功，返回token
  if (status == loginStatus.loginSucceed) {
    // 将状态标记为作废 避免重复获取token
    await req.UpdataLoginQueue({
      ineffective: true
    })
    const { userToken, refreshToken } = await createToken({
      id: user_id
    })
    return res.send({
      status: 200,
      data: {
        status,
        userToken,
        refreshToken
      }
    })
  }

  res.send({
    status: 200,
    data: {
      status
    }
  })
})

export default router
