import * as Router from 'koa-router'
import { verifyAuth } from '../crud/auth/auth.middleware'
import {
  deleteStu,
  createStu,
  updateStu,
  getStuById,
  searchStu
} from '../crud/stu/stu.middleware'

import { judgeLock } from '../handler/lockHandler'

const router = new Router({ prefix: '/api/stu' })

// create stu
router.post('/', judgeLock as any, verifyAuth, createStu)

// delete stu
router.delete('/:id', verifyAuth, deleteStu)

// update stu
router.patch('/', verifyAuth, updateStu)

// get stu by id
router.get('/:id', verifyAuth, getStuById)

// search stu by FormValue
router.post('/search', verifyAuth, searchStu)
export default router
