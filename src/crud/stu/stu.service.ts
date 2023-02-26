import Stu from '../../shared/stu'
import StuModel from '../../db/stu'
import FormValue from '../../shared/FormValue'
import offsetParam from '../../shared/offsetParam'

class Service {
  async deleteStu(id: string) {
    return await StuModel.findByIdAndRemove(id)
  }

  async updateStu(data: Stu) {
    const { _id, avatar, name, major, grade, sex, phone, email } = data
    const res = await StuModel.findByIdAndUpdate(_id, {
      $set: {
        avatar,
        name,
        major,
        grade,
        sex,
        phone,
        email
      }
    })
    return res
  }

  async createStu(data: Stu) {
    const stu = new StuModel(data)
    await stu.save()
  }

  async allStuFile(): Promise<Set<any>> {
    const set = await StuModel.find({}, ['avatar', '-_id']).catch((e) =>
      console.log(e)
    )
    return new Set((set as any).map((t) => t.avatar))
  }

  async allStuFileWithId(): Promise<Set<any>> {
    const set = await StuModel.find({}, ['avatar']).catch((e) => console.log(e))
    return new Set(set as any)
  }

  async updateAvatar(id: string, newAvatar: string) {
    await StuModel.findByIdAndUpdate(
      id,
      {
        $set: {
          avatar: newAvatar
        }
      },
      {}
    )
  }

  async findStuByOffset(props: { limit: number; offset: number }) {
    const { limit, offset } = props
    const res = await StuModel.find()
      .skip((offset - 1) * limit)
      .limit(limit)
      .catch((e) => console.log(e))
    return res
  }

  async findStuById(id: string) {
    const res = await StuModel.findById(id)
    return res
  }

  async searchStu(props: FormValue & offsetParam) {
    const sex = props.sex ? `^${props.sex}$` : undefined
    const major = props.major ? `^${props.major}$` : undefined
    const limit = props.limit ?? null
    const offset = props.offset ?? null
    let res = await StuModel.aggregate([
      {
        $match: {
          grade: { $regex: props.grade || '.*', $options: 'i' },
          name: { $regex: props.name || '.*', $options: 'i' },
          major: { $regex: major || '.*', $options: 'i' },
          sex: { $regex: sex || '.*', $options: 'i' }
        }
      },
      {
        $facet: {
          totalNum: [{ $group: { _id: null, count: { $sum: 1 } } }],
          data: [
            { $skip: offset ? (offset - 1) * props.limit : null },
            { $limit: limit }
          ]
        }
      },
      {
        $project: {
          count: '$totalNum.count',
          data: '$data'
        }
      }
    ])
    res = res[0]
    ;(res as any).count = (res as any).count[0]
    return res
  }
}

export default new Service()
