import { Router } from 'express'
import push from './push'

const router = Router()

router.use('/push', push)

export default router
