import { model, Schema } from 'mongoose'
import Stu from '../shared/stu'

const stuSchema = new Schema<Stu>(
  {
    avatar: { type: String, required: true },
    // todo:avatar默认值
    name: { type: String, required: true },
    major: { type: String, required: true },
    grade: { type: String, required: true },
    sex: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
  },
  { timestamps: false, versionKey: false }
)
const stuModel = model<Stu>('Student', stuSchema)
export default stuModel
