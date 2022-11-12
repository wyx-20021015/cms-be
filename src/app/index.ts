import Koa from 'koa'
import * as cors from 'koa2-cors'
import * as bodyParser from 'koa-bodyparser'
import useRoutes from '../router'
import errHandler from '../handler/errHandler'
import resHandler from '../handler/resHandler'
import {
  scheduleHandler,
  dispathDefaultAvatar,
  removeRedundantFile
} from '../handler/scheduleHandler'
import setupMongo from '../db'
const app = new Koa<{
  success: Boolean
  msg: string
}>({ proxy: true })

app.use(errHandler)
setupMongo()
scheduleHandler()
// removeRedundantFile()
// dispathDefaultAvatar()

app.use(cors())
app.use(bodyParser())
useRoutes(app)
app.use(resHandler)
export default app
