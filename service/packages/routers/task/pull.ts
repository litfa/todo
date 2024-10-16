import { Router } from 'express'
import { Request } from '@/app/types'
import Joi from 'joi'
import { Commits } from '@/db'
import { Op } from 'sequelize'

const router = Router()

router.use('/', async (req: Request, res) => {
  const body = req.validateBody<{
    lastSyncTime: number
  }>({
    lastSyncTime: Joi.number().min(0).required()
  })

  if (!body) {
    return res.send({
      status: 403
    })
  }

  const { lastSyncTime } = body
  const user = req.auth

  console.log(lastSyncTime)

  const results = await Commits.findAll({
    where: {
      [Op.or]: [
        {
          created_time: {
            [Op.gt]: lastSyncTime
          }
        },
        {
          last_edit_time: {
            [Op.gt]: lastSyncTime
          }
        }
      ],
      user: user.id
    }
  })

  res.send({
    status: 200,
    data: results.map((e) => e.toJSON())
  })
})

export default router
