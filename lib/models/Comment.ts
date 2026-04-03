import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IComment extends Document {
  postId: mongoose.Types.ObjectId
  parentId: mongoose.Types.ObjectId | null
  authorId: mongoose.Types.ObjectId
  content: string
  createdAt: Date
  updatedAt: Date
}

const CommentSchema = new Schema<IComment>(
  {
    postId:   { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    parentId: { type: Schema.Types.ObjectId, ref: 'Comment', default: null },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content:  { type: String, required: true, trim: true },
  },
  { timestamps: true }
)

CommentSchema.index({ postId: 1, parentId: 1, createdAt: 1 })
CommentSchema.index({ parentId: 1, createdAt: 1 })

export const Comment: Model<IComment> =
  mongoose.models.Comment ?? mongoose.model<IComment>('Comment', CommentSchema)