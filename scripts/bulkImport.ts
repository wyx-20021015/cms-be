// 没有性别的数据 所以性别是随机生成的

import stuModel from '../src/db/stu'
import Stu from '../src/shared/stu'
import setupMongo from '../src/db/index'
import * as fs from 'fs'
import * as path from 'path'
import grades from '../src/shared/grades'
import majors from '../src/shared/majors'
const axios = require('axios')
// import * as axios from 'axios'

setupMongo().catch((e) => console.log(e))

const sexs = ['female', 'male']

const testData: Array<Stu> = []

const randomPhone = () => {
  const phone: Array<number> = []
  for (let i = 0; i < 9; i++) {
    const randomNum = Math.floor(Math.random() * 10)
    phone.push(randomNum)
  }
  const second = Math.floor(Math.random() * 7) + 3
  const first = 1
  phone.unshift(second)
  phone.unshift(first)
  return phone.join('')
}

const data = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'data.json'), { encoding: 'utf-8' })
).res
// console.log(data)
for (const item of data) {
  const name = item.name
  const img = item.img
  const sex: any = sexs[Math.floor(Math.random() * 2)]
  const phone = randomPhone()
  const email = `${randomPhone()}@qq.com`
  const grade = grades[Math.floor(Math.random() * grades.length)]
  const ext = img.split('.').pop()
  const major = majors[Math.floor(Math.random() * majors.length)]
  const avatar = `avatar-${Date.now().toString(13)}${Math.floor(
    Math.random() * 999
  )}.${ext as string}`
  axios.get(img, { responseType: 'arraybuffer' }).then((res) => {
    fs.writeFileSync(
      path.resolve(__dirname, `../src/file/avatar/${avatar}`),
      res.data
    )
  })
  testData.push({
    name,
    avatar,
    sex,
    phone,
    email,
    grade,
    major
  })
}

stuModel
  .insertMany(testData)
  .then(function () {
    console.log('Data inserted, use ctrl+c to exit') // Success
  })
  .catch(function (error) {
    console.log(error) // Failure
  })
