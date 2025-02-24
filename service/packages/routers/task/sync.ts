import { Router } from 'express'
import { Request } from '@/app/types'
import { Response } from 'express'
import Joi from 'joi'
import { TargetTable } from '@ltfei/todo-common/'
import { getModel, Table } from '@/utils/handlingCommits'
import { ModelStatic, Model, Op } from 'sequelize'

const router = Router()

const sync = (table: TargetTable) => async (req: Request, res: Response) => {
  const body = req.validateBody<{
    lastSyncTime: number
  }>({
    lastSyncTime: Joi.number().integer().min(0).max(Date.now()).required()
  })

  if (!body) {
    return res.send({
      status: 403
    })
  }

  const { lastSyncTime } = body
  const syncTime = Date.now()
  const user = req.auth

  const model: ModelStatic<Model<Table>> = getModel(table)

  const results = await model.findAll({
    where: {
      owner: user.id,
      [Op.or]: [
        {
          created_time: {
            [Op.gte]: lastSyncTime,
            [Op.lt]: syncTime
          }
        },
        {
          last_edit_time: {
            [Op.gte]: lastSyncTime,
            [Op.lt]: syncTime
          }
        }
      ]
    }
  })

  res.send({
    status: 200,
    data: results.map((e) => e.toJSON())
  })
}

router.use('/tasks', sync('tasks'))
router.use('/subTasks', sync('subTasks'))
router.use('/taskList', sync('taskList'))

export default router
