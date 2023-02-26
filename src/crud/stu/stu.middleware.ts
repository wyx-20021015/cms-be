import { Middleware } from 'koa'
import Service from './stu.service'
import { doDelete } from '../upload/upload.middleware'
import Stu from '../../shared/stu'

const createStu: Middleware = async (ctx, next) => {
  const req = ctx.request.body as Stu
  req.name = req.name.trim()
  try {
    await Service.createStu(req)
  } catch (e) {
    throw new Error('参数格式错误!')
  }
  await next()
}

const deleteStu: Middleware = async (ctx, next) => {
  const { id } = ctx.params
  const res = await Service.deleteStu(id)
  if (res === null) {
    ctx.success = false
    ctx.msg = '找不到该用户，可能已经删除'
  } else {
    try {
      doDelete(`avatar/${res.avatar}`)
    } catch (e) {
      ctx.msg = '删除用户成功，但是删除图片失败了.'
    }
  }
  ctx.success = true
  await next()
}

const updateStu: Middleware = async (ctx, next) => {
  const req = ctx.request.body as Stu
  const res = await Service.updateStu(req)
  if (res === null) throw new Error('未找到用户')
  ctx.success = true
  await next()
}

const getStuByOffset: Middleware = async (ctx, next) => {
  const { limit, offset } = ctx.query
  const res = await Service.findStuByOffset({
    limit: parseInt(limit as string),
    offset: parseInt(offset as string)
  })
  ctx.body = res
  await next()
}

const getStuById: Middleware = async (ctx, next) => {
  const res = await Service.findStuById(ctx.params.id)
  ctx.body = res
  await next()
}

const searchStu: Middleware = async (ctx, next) => {
  const req = ctx.request.body as any
  req.limit = parseInt(req.limit)
  req.offset = parseInt(req.offset)
  try {
    ctx.body = await Service.searchStu(req)
  } catch (e) {
    throw new Error('参数错误!是否传入了offset和limit?')
  }

  await next()
}
export {
  deleteStu,
  updateStu,
  createStu,
  getStuByOffset,
  searchStu,
  getStuById
}
