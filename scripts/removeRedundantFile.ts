import * as fs from 'fs'
import * as path from 'path'
import Service from '../src/crud/stu/stu.service'
import setupMongo from '../src/db/index'

setupMongo().catch((e) => e)
const removeRedundantFile = async () => {
  const allStuFile = await Service.allStuFile()
  // console.log(allStuFile)
  const allFile = fs.readdirSync(path.resolve(__dirname, '../src/file/avatar'))
  for (const file of allFile) {
    if (!allStuFile.has(file) && file !== 'default.png') {
      fs.unlinkSync(path.resolve(__dirname, `../src/file/avatar/${file}`))
    }
  }
}

removeRedundantFile()
  .then(() => {
    console.log('use ctrl+c to exit..')
  })
  .catch((e) => e)
