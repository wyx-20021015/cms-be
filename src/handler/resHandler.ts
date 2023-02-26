import { Middleware } from 'koa'
import httpRes from '../shared/httpRes'
const resHandler: Middleware = (ctx, next) => {
  // console.log(ctx.body, ctx.success, ctx.status, ctx.msg)
  const data = ctx.body || null
  const msg = ctx.msg || null
  if (data === null && msg === null) {
    ctx.status = 404
    ctx.success = false
  }
  const success = ctx.success === undefined ? true : ctx.success
  if (success === true) ctx.status = 200
  const res: httpRes = { msg, data, success }
  ctx.body = res
}

export default resHandler
