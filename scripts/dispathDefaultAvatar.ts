import * as fs from 'fs'
import * as path from 'path'
import Service from '../src/crud/user/user.service'
import setupMongo from '../src/db/index'

setupMongo()
const dispathDefaultAvatar = async () => {
  const allUserFile = await Service.allUserFileWithId()
  const allFile = fs.readdirSync(path.resolve(__dirname, '../src/file/avatar'))
  const allFileSet = new Set(allFile)
  for (let key of allUserFile.keys()) {
    if (!allFileSet.has(key.avatar)) {
      Service.updateAvatar(key._id, 'default.png')
    }
  }
}

dispathDefaultAvatar().then(() => {
  console.log('use ctrl+c to exit..')
})
