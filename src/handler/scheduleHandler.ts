import * as schedule from 'node-schedule'
import * as fs from 'fs'
import * as path from 'path'
import Service from '../crud/user/user.service'
import { lock } from './lockHandler'

const scheduleHandler = () => {
  schedule.scheduleJob('0 0 3 * * *', async () => {
    lock.p()
    await removeRedundantFile()
    lock.v()
    dispathDefaultAvatar()
  })
  schedule.scheduleJob('0 59 2 * * *', async () => {
    lock.p()
  })
  schedule.scheduleJob('0 10 3 * * *', async () => {
    lock.v()
  })
}
const removeRedundantFile = async () => {
  const allUserFile = await Service.allUserFile()
  const allFile = fs.readdirSync(path.resolve(__dirname, '../file/avatar'))
  for (let file of allFile) {
    if (!allUserFile.has(file) && file !== 'default.png') {
      fs.unlinkSync(path.resolve(__dirname, `../file/avatar/${file}`))
    }
  }
}
const dispathDefaultAvatar = async () => {
  const allUserFile = await Service.allUserFileWithId()
  const allFile = fs.readdirSync(path.resolve(__dirname, '../file/avatar'))
  const allFileSet = new Set(allFile)
  for (let key of allUserFile.keys()) {
    if (!allFileSet.has(key.avatar)) {
      Service.updateAvatar(key._id, 'default.png')
    }
  }
}

export { scheduleHandler, removeRedundantFile, dispathDefaultAvatar }
