import { Router } from 'express'
import { Request } from '@/app/types'
import Joi from 'joi'
import { verifyRefreshToken, createToken } from '@/utils/token'
const router = Router()

router.post('/', async (req: Request, res) => {
  const body = req.validateBody<{
    refreshToken: string
  }>({
    refreshToken: Joi.string().required()
  })

  if (!body) {
    return res.send({
      status: 403
    })
  }

  const auth = await verifyRefreshToken(body.refreshToken)

  if (!auth) {
    return res.send({
      status: 401
    })
  }

  const user = {
    id: auth.id
  }

  const { refreshToken, userToken } = await createToken(user)

  res.send({
    status: 200,
    data: {
      userToken,
      refreshToken
    }
  })
})

export default router
