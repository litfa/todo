import { Router } from 'express'
import refreshToken from './refreshToken'
import login from './login'
import wxLogin from './wxLogin'
import qqConnectLogin from './qqConnectLogin'

const router = Router()

router.use('/login', login)
router.use('/wxLogin', wxLogin)
// router.use('/qqConnectLogin', qqConnectLogin)

router.use('/refreshToken', refreshToken)

export default router
