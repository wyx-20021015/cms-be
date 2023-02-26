import * as crypto from 'crypto'
function md5password(password: string) {
  const md5 = crypto.createHash('md5')
  const res = md5.update(password).digest('hex')
  return res
}

export default md5password
