import * as Router from 'koa-router'

import {
  verifyLogin,
  verifyAuth,
  setSession,
  logOut
} from '../crud/auth/auth.middleware'

const router = new Router({ prefix: '/api/login' })
router.post('/', verifyLogin, setSession)
router.get('/', verifyAuth as any)
router.delete('/', logOut as any)
// router.post('/test')

export default router
