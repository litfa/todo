import { Request } from '@/app/types'
import { Users } from '@/db'
import { Router } from 'express'

const router = Router()

router.get('/', async (req: Request, res) => {
  const auth = req.auth

  const userinfo = await Users.findOne({
    where: {
      id: auth.id
    },
    attributes: [
      'id',
      'username',
      'avatar',
      'city',
      'gender',
      'register_date',
      'last_login_date',
      'register_ip',
      'status',
      'avatar_pendant',
      'desc',
      'wx_openid',
      'wx_unionid',
      'qq_openid'
    ]
  })

  res.send({
    status: 200,
    data: userinfo
  })
})

export default router
