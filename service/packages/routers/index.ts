import { Router } from 'express'
import task from './task'
import auth from './auth'

const router = Router()

router.use('/task', task)
router.use('/auth', auth)

export default router
