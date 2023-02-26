import * as fs from 'fs'
import * as path from 'path'
import Service from '../src/crud/stu/stu.service'
import setupMongo from '../src/db/index'

setupMongo().catch((e) => e)
const dispathDefaultAvatar = async () => {
  const allStuFile = await Service.allStuFileWithId()
  const allFile = fs.readdirSync(path.resolve(__dirname, '../src/file/avatar'))
  const allFileSet = new Set(allFile)
  for (const key of allStuFile.keys()) {
    if (!allFileSet.has(key.avatar)) {
      await Service.updateAvatar(key._id, 'default.png')
    }
  }
}

dispathDefaultAvatar()
  .then(() => {
    console.log('use ctrl+c to exit..')
  })
  .catch((e) => e)
