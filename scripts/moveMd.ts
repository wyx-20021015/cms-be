import * as fs from 'fs'
import * as path from 'path'

const removeMd = (source: string, dest: string) => {
  const data = fs.readFileSync(path.resolve(__dirname, source), {
    encoding: 'utf-8'
  })
  fs.writeFileSync(path.resolve(__dirname, dest), data, { flag: 'w+' })
}
removeMd('../detail.md', '../src/file/md/be/detail.md')
removeMd('../README.md', '../src/file/md/be/README.md')
removeMd('../../fe/detail.md', '../src/file/md/fe/detail.md')
removeMd('../../fe/README.md', '../src/file/md/fe/README.md')
