import { Middleware } from 'koa'
import * as path from 'path'
import * as multer from '@koa/multer'
import * as fs from 'fs'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, `../../file/${file.fieldname}`))
  },
  filename: function (req, file, cb) {
    const type = file.originalname.split('.')[1]
    cb(
      null,
      `${file.fieldname}-${Date.now().toString(13)}${Math.floor(
        Math.random() * 999
      )}.${type}`
    )
  }
})
const limits = {
  fields: 10, // 非文件字段的数量
  fileSize: 500 * 1024, // 文件大小 单位 b
  files: 1 // 文件数量
}
const upload = multer({ storage, limits })

const createResource = upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'md', maxCount: 1 }
])

type fileReqParam = {
  fileName: string
  field: string
}
const getResource: Middleware = async (ctx, next) => {
  const { fileName, field } = ctx.params as fileReqParam
  if (fileName === undefined) {
    throw new Error('请提供文件名')
  }
  const filePath = path.resolve(__dirname, `../../file/${field}/${fileName}`)
  let file
  try {
    file = fs.readFileSync(filePath)
  } catch (e) {
    ctx.success = false
    throw new Error('文件路径有误或已经删除!')
  }
  // console.log(file)
  ctx.body = file
  if (field === 'md') {
    ctx.body = file.toString()
    await next()
  }
  // avatar不需要格式化返回结果，不next()
}
const deleteResource: Middleware = async (ctx, next) => {
  const { fileName, field } = ctx.params as fileReqParam
  // const filePath = path.resolve(__dirname, `../../file/${field}/${fileName}`)
  const filePath = `${field}/${fileName}`
  doDelete(filePath)
  ctx.msg = 'ok!'
  ctx.success = true
  await next()
}
const doDelete = (file: string) => {
  const filePath = path.resolve(__dirname, `../../file/${file}`)
  try {
    fs.unlinkSync(filePath)
  } catch (e) {
    throw new Error('文件路径有误或已经删除')
  }
}
const formatRes: Middleware = async (ctx, next) => {
  if (JSON.stringify(ctx.files) === '{}') throw new Error('上传图片为空!')
  ctx.body = (ctx.files as any).avatar[0].filename
  console.log('上传成功')
  await next()
}
export { getResource, createResource, deleteResource, formatRes, doDelete }
