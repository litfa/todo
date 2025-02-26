import { Router } from 'express'
import auth from './auth'
import task from './task'
import user from './user'

const router = Router()

router.use('/task', task)
router.use('/auth', auth)
router.use('/user', user)

export default router
