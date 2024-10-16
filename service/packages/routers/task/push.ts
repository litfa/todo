import { Router } from 'express'
import {
  Commit,
  Task,
  TaskList,
  SubTask,
  Update,
  Delete,
  Create
} from '@ltfei/todo-common'
import { Request } from '@/app/types'
import Joi from 'joi'
import { handlingCommits } from '@/utils/commit'

const router = Router()

router.post('/', async (req: Request, res) => {
  const body = req.validateBody<{
    commits: Commit<Task | TaskList | SubTask>[]
  }>({
    commits: Joi.array()
      .items(
        Joi.object({
          commitId: Joi.string().required(),
          operation: Joi.string().valid(Update, Delete, Create).required(),
          targetTable: Joi.string().required(),
          source: Joi.string().required(),
          // 用户id
          user: Joi.number().required(),
          data: Joi.any(),
          createdTime: Joi.number().required(),
          lastEditTime: Joi.number().required()
        })
      )
      .required()
  })

  if (!body) {
    res.send({
      status: 403
    })
    return
  }
  const { commits } = body
  const user = req.auth

  const illegalData = commits.find((commit) => {
    return commit.user != user.id || (commit.data.owner && commit.data.owner != user.id)
  })

  if (illegalData) {
    return res.send({
      status: 403
    })
  }

  const results = await Promise.allSettled(
    commits.map((commit) => {
      return handlingCommits(commit)
    })
  )

  res.send({
    status: 200,
    data: results.map((e) => {
      const err = e.status == 'rejected'
      if (err) {
        return {
          err
        }
      }
      return {
        err,
        value: e.value
      }
    })
  })
})

export default router
