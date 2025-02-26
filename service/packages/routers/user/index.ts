import userInfo from './userInfo'

import { Router } from 'express'

const router = Router()

router.use('/userInfo', userInfo)

export default router
