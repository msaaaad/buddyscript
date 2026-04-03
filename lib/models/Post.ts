import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IPost extends Document {
  authorId: mongoose.Types.ObjectId
  content: string
  imageUrl?: string
  visibility: 'public' | 'private'
  createdAt: Date
  updatedAt: Date
}

const PostSchema = new Schema<IPost>(
  {
    authorId:   { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content:    { type: String, required: true, trim: true },
    imageUrl:   { type: String },
    visibility: { type: String, enum: ['public', 'private'], default: 'public' },
  },
  { timestamps: true }
)

PostSchema.index({ createdAt: -1 })
PostSchema.index({ authorId: 1, createdAt: -1 })
PostSchema.index({ visibility: 1, createdAt: -1 })

export const Post: Model<IPost> =
  mongoose.models.Post ?? mongoose.model<IPost>('Post', PostSchema)