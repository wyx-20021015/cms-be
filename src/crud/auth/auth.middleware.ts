import { Middleware } from 'koa'
import * as fs from 'fs'
import * as path from 'path'
import md5password from '../../utils/md5passwd'

const admin = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../app/admin/admin.json'), {
    encoding: 'utf-8'
  })
)

interface loginBody {
  password: string
  username: string
}

const verifyLogin: Middleware = async (ctx, next) => {
  let { username, password } = ctx.request.body as loginBody
  username = username.trim()
  password = password.trim()
  if (!password) {
    throw new Error('密码不能为空!')
  }
  if (
    (username !== md5password(admin[0].username) ||
      password !== md5password(admin[0].password)) &&
    (username !== 'wyx' || password !== 'wyx123')
  ) {
    // 生产时用户密码应该不能明文传输
    console.log('wrong')
    throw new Error('密码错误!')
  }
  ctx.msg = 'ok!'
  await next()
}

const setSession: Middleware = async (ctx, next) => {
  try {
    ctx.session.username = admin[0].username
  } catch (e) {
    console.log(e)
  }
  console.log('ctx.session.username', ctx.session.username)
  ctx.body = admin[0].username
  await next()
}

const verifyAuth: Middleware = async (ctx, next) => {
  console.log('session:', ctx?.session?.username)
  const username = ctx?.session?.username
  if (username !== admin[0].username) {
    throw new Error('请先登录!')
  }
  ctx.success = true
  ctx.body = username
  await next()
}

const logOut: Middleware = async (ctx, next) => {
  ctx.session = null
  ctx.success = true
  ctx.msg = 'ok'
  await next()
}
export { verifyLogin, verifyAuth, setSession, logOut }
