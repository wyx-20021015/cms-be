import * as Router from 'koa-router'

import { verifyLogin, verifyAuth, genToken } from '../crud/auth/auth.middleware'

const router = new Router({ prefix: '/login' })
router.post('/', verifyLogin, genToken)

export default router
