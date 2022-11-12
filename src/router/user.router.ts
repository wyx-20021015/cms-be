import * as Router from 'koa-router'
import { verifyAuth } from '../crud/auth/auth.middleware'
import {
  deleteUser,
  createUser,
  updateUser,
  getUserById,
  searchUser,
  getUserByOffset
} from '../crud/user/user.middleware'

import { judgeLock } from '../handler/lockHandler'

const router = new Router({ prefix: '/user' })

//create user
router.post('/', judgeLock as any, verifyAuth, createUser)

// delete user
router.delete('/:id', verifyAuth, deleteUser)

//update user
router.patch('/:id', verifyAuth, updateUser)

//get user by id
router.get('/:id', verifyAuth, getUserById)

//get user by offset
router.get('/', verifyAuth, getUserByOffset)

//search user by FormValue
router.post('/search', verifyAuth, searchUser)
export default router
