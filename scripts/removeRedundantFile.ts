import * as fs from 'fs'
import * as path from 'path'
import Service from '../src/crud/user/user.service'
import setupMongo from '../src/db/index'

setupMongo()
const removeRedundantFile = async () => {
  const allUserFile = await Service.allUserFile()
  // console.log(allUserFile)
  const allFile = fs.readdirSync(path.resolve(__dirname, '../src/file/avatar'))
  for (let file of allFile) {
    if (!allUserFile.has(file) && file !== 'default.png') {
      fs.unlinkSync(path.resolve(__dirname, `../src/file/avatar/${file}`))
    }
  }
}

removeRedundantFile().then(() => {
  console.log('use ctrl+c to exit..')
})
