import { Middleware } from 'Koa'
class Lock {
  constructor(private lock: Boolean) {}
  p() {
    this.lock = false
  }

  v() {
    this.lock = true
  }

  getStatus() {
    return this.lock
  }
}
const lock = new Lock(true)
const judgeLock: Middleware = async (ctx, next) => {
  if (lock.getStatus() === false) {
    ctx.status = 500
    throw new Error('服务器错误')
  }
  await next()
}
export { lock, judgeLock }
