import { Middleware } from 'koa'
import Service from './user.service'
import User from '../../shared/user'
import * as fs from 'fs'
import { deleteResource } from '../upload/upload.middleware'

const createUser: Middleware = async (ctx, next) => {
  const req = ctx.request.body as User
  try {
    await Service.createUser(req)
  } catch (e) {
    throw new Error('参数格式错误!')
  }
  await next()
}

const deleteUser: Middleware = async (ctx, next) => {
  const { id } = ctx.params
  const res = await Service.deleteUser(id)
  if (res === null) {
    ctx.success = false
    ctx.msg = '找不到该用户，可能已经删除'
  }
  ctx.success = true
  await next()
}

const updateUser: Middleware = async (ctx, next) => {
  const req = ctx.request.body
  await next()
}

const getUserByOffset: Middleware = async (ctx, next) => {
  console.log('query by offset')
  let { limit, offset } = ctx.query
  const res = await Service.findUserByOffset({
    limit: parseInt(limit as string),
    offset: parseInt(offset as string)
  })
  ctx.body = res
  await next()
}

const getUserById: Middleware = async (ctx, next) => {
  const res = await Service.findUserById(ctx.params.id)
  ctx.body = res
  await next()
}

const searchUser: Middleware = async (ctx, next) => {
  const req = ctx.request.body
  console.log('search api', req)
  ctx.body = await Service.searchUser(req)
  await next()
}
export {
  deleteUser,
  updateUser,
  createUser,
  getUserByOffset,
  searchUser,
  getUserById
}
