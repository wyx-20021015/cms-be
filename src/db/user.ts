import { Document, model, Model, Schema } from 'mongoose'
import User from '../shared/user'

const userSchema = new Schema<User>(
  {
    avatar: { type: String, required: true },
    //todo:avatar默认值
    name: { type: String, required: true },
    major: { type: String, required: true },
    grade: { type: String, required: true },
    sex: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
  },
  { timestamps: false, versionKey: false }
)
const userModel = model<User>('User', userSchema)
export default userModel
