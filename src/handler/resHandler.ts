import { Middleware } from 'koa'
import httpRes from '../shared/httpRes'
const resHandler: Middleware = (ctx, next) => {
  // console.log(ctx.body, ctx.success, ctx.status, ctx.msg)
  const data = ctx.body || null
  let status = ctx.status || 200
  const msg = ctx.msg || null
  let success = ctx.success === undefined ? true : ctx.success
  if (success === true) status = 200
  const res: httpRes = { status, msg, data, success }
  ctx.body = res
}

export default resHandler
