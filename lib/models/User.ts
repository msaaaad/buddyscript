import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser extends Document {
  firstName: string
  lastName: string
  email: string
  passwordHash: string
  createdAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName:  { type: String, required: true, trim: true },
    email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
)

UserSchema.index({ email: 1 })

export const User: Model<IUser> =
  mongoose.models.User ?? mongoose.model<IUser>('User', UserSchema)