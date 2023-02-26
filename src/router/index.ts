import * as Koa from 'koa'
const fs = require('fs')
const useRoutes = function (app: Koa) {
  fs.readdirSync(__dirname).forEach((file: string) => {
    const router = require(`./${file}`).default
    if (router.methods === undefined) {
      return
    }
    app.use(router.routes())
    app.use(router.allowedMethods())
  })
}

export default useRoutes
