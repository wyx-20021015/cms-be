import { model, Schema } from 'mongoose'
type Seesion = {
  key: string
  value: Object
}

const seesionSchema = new Schema<Seesion>(
  {
    key: { type: String, required: true, unique: true },
    value: { type: Object, required: true }
  },
  { timestamps: true, versionKey: false }
)
const seesionModel = model<Seesion>('session', seesionSchema)
export default seesionModel
