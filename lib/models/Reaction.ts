import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IReaction extends Document {
  targetId: mongoose.Types.ObjectId
  targetType: 'post' | 'comment'
  userId: mongoose.Types.ObjectId
  createdAt: Date
}

const ReactionSchema = new Schema<IReaction>(
  {
    targetId:   { type: Schema.Types.ObjectId, required: true },
    targetType: { type: String, enum: ['post', 'comment'], required: true },
    userId:     { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
)

ReactionSchema.index({ targetId: 1, targetType: 1 })
ReactionSchema.index({ targetId: 1, targetType: 1, userId: 1 }, { unique: true })

export const Reaction: Model<IReaction> =
  mongoose.models.Reaction ?? mongoose.model<IReaction>('Reaction', ReactionSchema)