// 这个例子，session是存储在了客户端，但是加密了。依然不安全,keys泄漏就比较危险。
// const session = require('koa-session')
// import Koa from 'koa'

import * as session from 'koa-session'
import Koa from 'koa'
import SessionModel from '../db/session'
// import * as fs from 'fs'
// // import * as path from 'path'
// // import publicKeyPath from '../app/key/public.key'

// // const publicKey = fs.readFileSync(publicKeyPath)

const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDd+iJ/nJL0ALEnRT6sYHaV/IRu
hJVlbV0zLvOXmv31IWa1fWJEOHao9qXfLMsdECLeTSl1yRjf5S5NBH4eIXl4yhAq
/P3/kICLrtU1cjEdaE34xikIzh5ru+1UOU9DYCjYc1PiAlX7cLyy+8qbC6NVA8cY
vNNTprgLu3dLKFYyQQIDAQAB
-----END PUBLIC KEY-----
`

const setSession = (app: Koa) => {
  app.keys = [publicKey as any]
  app.use(session(CONFIG, app))
}
// const SessionStore = {}
const CONFIG = {
  key: 'wyx' /** (string) cookie key (default is koa.sess) */,
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true /** (boolean) automatically commit headers (default true) */,
  overwrite: true /** (boolean) can overwrite or not (default true) */,
  httpOnly: true /** (boolean) httpOnly or not (default true) */,
  signed: true /** (boolean) signed or not (default true) */,
  rolling:
    false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
  renew:
    false /**  (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false) */,
  secure: false /** (boolean) secure cookie */,
  sameSite:
    null /** (string) session cookie sameSite options (default null, don't set it) */,
  store: {
    get: async (key) => {
      const res = await SessionModel.find({
        key
      })
      const value = (res[0] as any)?.value ?? null
      return value
      // return SessionStore[key]
    },
    set: async (key, value, maxAge) => {
      // console.log('set', key, value, maxAge)
      // 存储在Node.js内存中，进程结束就没了。最合适的是存储在三方体系中，比如redis
      const newSession = new SessionModel({ key, value })
      await newSession.save()
      // console.log('set', key, value, maxAge)
      // // 存储在Node.js内存中，进程结束就没了。最合适的是存储在三方体系中，比如redis
      // SessionStore[key] = value
    },
    destroy: async (key) => {
      console.log('destory')
      await SessionModel.findOneAndRemove({
        key
      })
    }
  }
}

export default setSession
// app.use(session(CONFIG, app))
// or if you prefer all default config, just use => app.use(session(app));

// app.use((ctx) => {
//   // ignore favicon
//   if (ctx.path === '/favicon.ico') return

//   let n = ctx.session.views || 0
//   ctx.session.views = ++n
//   ctx.body = n + ' views'
// })

// app.listen(3000)
// console.log('listening on port 3000')
