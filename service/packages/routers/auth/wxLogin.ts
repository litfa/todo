import { Router } from 'express'
import Joi from 'joi'
import { checkLogin } from '@/utils/wx/checkLogin'
import { findOrCreateUser } from '@/utils/findOrCreateUser'
import { createToken } from '@/utils/token'
import { getUnlimited } from '@/utils/wx/getUnlimited'
import { LoginQueue } from '@/db'
import { keys } from '@ltfei/todo-common'
import type { LoginRequest } from '@/app/types'
import { checkUuid, generateRandomString } from '@/utils/loginApi'
import { getConfig } from '@/config'
import { app as logger } from '@/utils/log'

const { loginStatus } = keys.loginQueue

const router = Router()

/**
 * 微信小程序单独登录的init
 */
router.post('/init', async (req, res) => {
  const { enable } = await getConfig('login_method', 'wx_miniprogram')
  if (!enable) {
    return res.send({
      status: 403,
      msg: '未启用微信小程序登录'
    })
  }
  const uuid = generateRandomString()
  await LoginQueue.create({
    status: loginStatus.scanCode,
    date: Date.now(),
    uuid,
    ineffective: false
  })

  res.send({
    status: 200,
    data: {
      uuid
    }
  })
})

interface Body {
  /**
   * 微信小程序 调用 wx.login 获取的code
   */
  code: string
  uuid: string
}

const schema = Joi.object({
  code: Joi.string().length(32).required(),
  uuid: Joi.string().max(32)
})

/**
 * 小程序登录(仅在小程序调用)
 */
router.post('/login', checkUuid(loginStatus.scanCode), async (req: LoginRequest, res) => {
  const validate = schema.validate(req.body)

  if (validate.error) {
    return res.send({
      status: 403
    })
  }

  const { code } = req.body as Body

  const login = await checkLogin(code)
  if (login.err != false) {
    console.log(login)

    return res.send({
      status: 403
    })
  }

  const { openid, unionid } = login
  const [user, created] = await findOrCreateUser(
    {
      wx_unionid: unionid
    },
    {
      username: `微信用户_${openid}`,
      register_date: Date.now(),
      register_ip: req.ip,
      wx_openid: openid,
      wx_unionid: unionid
    }
  )

  const userId = user.toJSON().id
  // 修改登录状态
  await req.UpdataLoginQueue({
    status: loginStatus.loginSucceed,
    user_id: userId,
    auth_method: 'wx_miniprogram'
  })

  const { userToken, refreshToken } = await createToken({
    id: userId
  })

  res.send({
    status: 200,
    data: {
      userToken,
      refreshToken,
      type: created ? 'register' : 'login'
    }
  })
})

router.post(
  '/getQrCode',
  checkUuid(loginStatus.notLogin),
  async (req: LoginRequest, res) => {
    const { uuid } = req.body

    try {
      const buffer = await getUnlimited(uuid)

      res.type('image/jpeg')
      res.send(buffer)
    } catch (e) {
      logger.error(e)
      res.send({
        status: 500
      })
    }
  }
)

/**
 * 检测 scene 是否有效，并修改状态为已扫码
 */
router.post(
  '/checkScene',
  checkUuid(loginStatus.notLogin),
  async (req: LoginRequest, res) => {
    await req.UpdataLoginQueue({
      status: loginStatus.scanCode
    })

    return res.send({
      status: 200
    })
  }
)

export default router
