import User from '../../shared/user'
import userModel from '../../db/user'
import FormValue from '../../shared/FormValue'

type fileMapType = {
  id: string
  avatar: string
}
class Service {
  async deleteUser(id: string) {
    return await userModel.findByIdAndRemove(id)
  }

  async updateUser(id: string, data: User) {
    const { avatar, name, major, grade, sex, phone, email } = data
    await userModel.findByIdAndUpdate(
      id,
      {
        $set: {
          avatar,
          name,
          major,
          grade,
          sex,
          phone,
          email
        }
      },
      {},
      function (err, data) {
        if (err) {
          console.log('数据库发生错误')
        } else if (!data) {
          console.log('未查找到相关数据')
          // console.log(data)
        } else if (data) {
          console.log('修改数据成功')
          // console.log(data)
        }
      }
    )
  }

  async createUser(data: User) {
    const user = new userModel(data)
    await user.save()
  }

  async allUserFile(): Promise<Set<any>> {
    const set = await userModel
      .find({}, ['avatar', '-_id'])
      .catch((e) => console.log(e))
    return new Set((set as any).map((t) => t.avatar))
  }

  async allUserFileWithId(): Promise<Set<any>> {
    const set = await userModel
      .find({}, ['avatar'])
      .catch((e) => console.log(e))
    return new Set(set as any)
  }

  async updateAvatar(id: string, newAvatar: string) {
    await userModel.findByIdAndUpdate(
      id,
      {
        $set: {
          avatar: newAvatar
        }
      },
      {}
    )
  }

  async findUserByOffset(props: { limit: number; offset: number }) {
    const { limit, offset } = props
    const res = await userModel
      .find()
      .skip((offset - 1) * limit)
      .limit(limit)
      .catch((e) => console.log(e))
    return res
  }

  async findUserById(id: string) {
    const res = await userModel.findById(id)
    return res
  }

  async searchUser(props: FormValue) {
    const sex = props.sex ? `^${props.sex}$` : undefined
    const major = props.major ? `^${props.major}$` : undefined
    const res = await userModel.find({
      grade: { $regex: props.grade || '.*', $options: 'i' },
      name: { $regex: props.name || '.*', $options: 'i' },
      major: { $regex: major || '.*', $options: 'i' },
      sex: { $regex: sex || '.*', $options: 'i' }
    })
    return res
  }
}

export default new Service()
