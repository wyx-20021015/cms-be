import * as schedule from 'node-schedule'
import * as fs from 'fs'
import * as path from 'path'
import Service from '../crud/stu/stu.service'
import { lock } from './lockHandler'

const scheduleHandler = () => {
  schedule.scheduleJob('0 0 3 * * *', async () => {
    lock.p()
    await removeRedundantFile()
    await dispathDefaultAvatar()
    lock.v()
  })
  schedule.scheduleJob('0 59 2 * * *', async () => {
    lock.p()
  })
  schedule.scheduleJob('0 20 3 * * *', async () => {
    lock.v()
  })
}
const removeRedundantFile = async () => {
  const allStuFile = await Service.allStuFile()
  const allFile = fs.readdirSync(path.resolve(__dirname, '../file/avatar'))
  for (const file of allFile) {
    if (!allStuFile.has(file) && file !== 'default.png') {
      fs.unlinkSync(path.resolve(__dirname, `../file/avatar/${file}`))
    }
  }
}
const dispathDefaultAvatar = async () => {
  const allStuFile = await Service.allStuFileWithId()
  const allFile = fs.readdirSync(path.resolve(__dirname, '../file/avatar'))
  const allFileSet = new Set(allFile)
  for (const key of allStuFile.keys()) {
    if (!allFileSet.has(key.avatar)) {
      await Service.updateAvatar(key._id, 'default.png')
    }
  }
}

export { scheduleHandler, removeRedundantFile, dispathDefaultAvatar }
