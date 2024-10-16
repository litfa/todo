import { Router } from 'express'
import push from './push'
import pull from './pull'

const router = Router()

router.use('/push', push)
router.use('/pull', pull)

export default router
