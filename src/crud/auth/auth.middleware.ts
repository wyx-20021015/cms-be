import { Middleware } from 'koa'
import md5passwd from '../../utils/md5passwd'
import * as jwt from 'jsonwebtoken'
import * as fs from 'fs'
import * as path from 'path'
const publicKey = fs.readFileSync(
  path.resolve(__dirname, '../../app/key/public.key')
)
const privateKey = fs.readFileSync(
  path.resolve(__dirname, '../../app/key/private.key')
)
interface loginBody {
  password: String
}
const verifyAuth: Middleware = async (ctx, next) => {
  console.log('测试token的接口')
  const { fieldName } = ctx.params
  if (fieldName === 'md') await verifyAuthByHeader(ctx, next)
  else if (fieldName === 'avatar') await verifyAuthByQuery(ctx, next)
  ctx.msg = 'ok'
  await next()
}

const verifyAuthByHeader: Middleware = async (ctx, next) => {
  const token = ctx.headers.authorization.replace('Bearer ', '')
  await verifyJwt(token)
}

const verifyJwt = async (token: string) => {
  try {
    const res = jwt.verify(token, publicKey, { algorithms: ['RS256'] })
    return res
  } catch (err) {
    throw new Error('无效的token!')
  }
}

const verifyAuthByQuery: Middleware = async (ctx, next) => {
  // img的src 不好在header携带token，图片请求的时候token放在query
  const { token } = ctx.query
  await verifyJwt(token as string)
}

const verifyLogin: Middleware = async (ctx, next) => {
  console.log('验证密码接口')
  const { password } = ctx.request.body as loginBody
  if (!password) {
    throw new Error('密码不能为空!')
  }
  if (password != md5passwd('wyx123666') && password != 'wyx123666') {
    //开发时在APIfox里用wyx123666，生产时应把 'wyx123666'删掉
    console.log('wrong')
    throw new Error('密码错误!')
  }
  ctx.msg = 'ok!'
  await next()
}
const genToken: Middleware = async (ctx, next) => {
  const user = 'wyx'
  let token
  try {
    token = jwt.sign({ user }, privateKey, {
      expiresIn: '30days',
      algorithm: 'RS256'
    })
  } catch (e) {
    console.log(e)
  }
  console.log('颁发token完成')
  ctx.body = { token }
  await next()
}
export { verifyLogin, verifyAuth, genToken }
