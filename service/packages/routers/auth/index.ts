import { Router } from 'express'
import refreshToken from './refreshToken'

const router = Router()

router.use('/refreshToken', refreshToken)

export default router
