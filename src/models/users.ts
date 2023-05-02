import { type InferSchemaType, Schema, model, type Document } from 'mongoose'

export interface UserDocument extends Document {
  name: string
  email: string
  password: string
  roleId: string
}

export interface UserSchemaType {
  name: { type: string; required: true }
  email: { type: string; required: true }
  password: { type: string; required: true }
  roleId: { type: string; required: true }
}

const userSchema = new Schema<UserSchemaType>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    roleId: { type: String, required: true }
  },
  { timestamps: true }
)

export default model<InferSchemaType<UserSchemaType>>('User', userSchema)
export const UserModel = model<InferSchemaType<UserSchemaType>>(
  'User',
  userSchema
)