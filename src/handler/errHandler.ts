import { Middleware } from 'koa'
import resHandler from './resHandler'
const errHandler: Middleware = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    console.log('trap into err handler')
    console.log(error)
    ctx.success = false
    ctx.msg = error.message
    resHandler(ctx, next)
  }
}
export default errHandler
