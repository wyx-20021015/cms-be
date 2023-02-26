import * as Router from 'koa-router'

import {
  createResource,
  deleteResource,
  getResource,
  formatRes
} from '../crud/upload/upload.middleware'
import { verifyAuth } from '../crud/auth/auth.middleware'

const router = new Router({ prefix: '/api/upload' })

router.post('/', verifyAuth as any, createResource, formatRes)
// router.get('/:field/:fileName(.*)', verifyAuth, getResource)
router.get('/:field/:fileName(.*)', getResource as any)
router.delete('/:field/:fileName(.*)', verifyAuth, deleteResource)
export default router
