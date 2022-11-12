import * as Router from 'koa-router'
import multer from '@koa/multer'

import {
  createResource,
  deleteResource,
  getResource,
  formatRes
} from '../crud/upload/upload.middleware'
import { verifyAuth } from '../crud/auth/auth.middleware'

const router = new Router({ prefix: '/upload' })

router.post('/', verifyAuth as any, createResource, formatRes)
router.get('/:field/:fileName(.*)', verifyAuth, getResource)
router.delete('/:field/:fileName', verifyAuth, deleteResource)
export default router
