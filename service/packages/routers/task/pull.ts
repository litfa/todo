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
   *
   * 返回三种情况
   * - 创建时间在未同步时间范围的
   * - 最后修改时间在未同步时间范围的
   * - 操作类型为 Delete 或 Create 且同步时间在未同步时间范围的
   */

  const results = await Commits.findAll({
    where: {
      [Op.or]: [
        {
          created_time: {
            [Op.gt]: lastSyncTime,
            [Op.lt]: syncTime
          }
        },
        {
          last_edit_time: {
            [Op.gt]: lastSyncTime,
            [Op.lt]: syncTime
          }
        },
        {
          operation: {
            [Op.not]: Update
          },
          sync_time: {
            [Op.gt]: lastSyncTime,
            [Op.lt]: syncTime
          }
        }
      ],
      user: user.id
    }
  })

  logger.debug(
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
