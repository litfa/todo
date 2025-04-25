import type { LoginRequest } from '@/app/types'
import { Router } from 'express'
import Joi from 'joi'
import { Users } from '@/db'
import { encrypion } from '@/utils/encrypion'
import { createToken } from '@/utils/token'

const router = Router()

router.post('/getCode', (req: LoginRequest, res) => {
  const body = req.validateBody<{
    email: string
  }>({
    email: Joi.string().email().required()
  })

  if (!body) {
    return res.send({
      status: 403
    })
  }

  const { email } = body

  console.log(email)
})

router.post('/login', async (req: LoginRequest, res) => {
  const body = req.validateBody<{
    email: string
    password: string
  }>({
    email: Joi.string().email().required(),
    password: Joi.string().length(64).required()
  })

  if (!body) {
    return res.send({
      status: 403
    })
  }

  const { email, password } = body

  const user = await Users.findOne({
    where: {
      email
    }
  })

  if (!user) {
    return res.send({
      status: 403,
      msg: 'user_not_exist'
    })
  }

  const secondaryInfilling = encrypion(password)
  if (user.toJSON().password != secondaryInfilling) {
    return res.send({
      status: 403,
      msg: 'incorrect_mailbox_or_password'
    })
  }

  res.send({
    status: 200,
    data: await createToken({
      id: user.toJSON().id
    })
  })
})

export default router
