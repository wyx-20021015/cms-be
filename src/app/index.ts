import Koa from 'koa'
import * as cors from 'koa2-cors'
import * as bodyParser from 'koa-bodyparser'
import useRoutes from '../router'
import errHandler from '../handler/errHandler'
import resHandler from '../handler/resHandler'
import setSession from '../handler/sessionHandler'
import * as server from 'koa-static'
import * as path from 'path'
import {
  scheduleHandler
  // dispathDefaultAvatar,
  // removeRedundantFile
} from '../handler/scheduleHandler'
import setupMongo from '../db'
const app = new Koa<{
  success: Boolean
  msg: string
}>()

app.use(errHandler)
setupMongo().catch((e) => e)
setSession(app)
scheduleHandler()

const serverPath = path.resolve(__dirname, '../static')
app.use(server(serverPath))

app.use(cors({ credentials: true, origin: (ctx) => ctx.header.origin }))
// app.use(cors())
app.use(bodyParser())
useRoutes(app)
app.use(resHandler)
export default app
