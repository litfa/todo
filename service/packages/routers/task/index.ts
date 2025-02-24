import { Router } from 'express'
import push from './push'
import pull from './pull'
import sync from './sync'

const router = Router()

router.use('/push', push)
router.use('/pull', pull)
router.use('/sync', sync)

export default router
