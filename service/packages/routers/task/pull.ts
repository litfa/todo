import { Router } from 'express'
import { Request } from '@/app/types'
import Joi from 'joi'
import { Commits } from '@/db'
import { Op } from 'sequelize'
import { convertKeysToCamelCase } from '@/utils/camelToSnakeCase'
import { Update } from '@ltfei/todo-common'
import { app as logger } from '@/utils/log'

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

  const syncTime = Date.now()

  /**
   * 未同步时间范围：上次同步时间~当前时间
   * [上次同步时间,当前时间)
   */
  const results = await Commits.findAll({
    where: {
      sync_time: {
        [Op.gte]: lastSyncTime,
        [Op.lt]: syncTime
      },
      user: user.id
    }
  })

  logger.info(
    `[pull] lastSyncTime:${lastSyncTime} syncTime:${syncTime} count:${results.length}`
  )

  res.send({
    status: 200,
    data: {
      syncTime,
      commits: results.map((e) => {
        const json = e.toJSON()
        return {
          ...convertKeysToCamelCase(json),
          data: JSON.parse(json.data)
        }
      })
    }
  })
})

export default router
