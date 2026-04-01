import mongoose, { Schema, Document, Model, Types } from 'mongoose'

interface IReply {
  _id: Types.ObjectId
  authorId: Types.ObjectId
  content: string
  likes: Types.ObjectId[]
  createdAt: Date
}

interface IComment {
  _id: Types.ObjectId
  authorId: Types.ObjectId
  content: string
  likes: Types.ObjectId[]
  replies: IReply[]
  createdAt: Date
}

export interface IPost extends Document {
  authorId: Types.ObjectId
  content: string
  imageUrl?: string
  visibility: 'public' | 'private'
  likes: Types.ObjectId[]
  comments: IComment[]
  createdAt: Date
  updatedAt: Date
}

const ReplySchema = new Schema<IReply>(
  {
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content:  { type: String, required: true, trim: true },
    likes:    [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
)

const CommentSchema = new Schema<IComment>(
  {
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content:  { type: String, required: true, trim: true },
    likes:    [{ type: Schema.Types.ObjectId, ref: 'User' }],
    replies:  [ReplySchema],
  },
  { timestamps: true }
)

const PostSchema = new Schema<IPost>(
  {
    authorId:   { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content:    { type: String, required: true, trim: true },
    imageUrl:   { type: String },
    visibility: { type: String, enum: ['public', 'private'], default: 'public' },
    likes:      [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments:   [CommentSchema],
  },
  { timestamps: true }
)

PostSchema.index({ createdAt: -1 })
PostSchema.index({ authorId: 1, createdAt: -1 })
PostSchema.index({ visibility: 1, createdAt: -1 })

export const Post: Model<IPost> =
  mongoose.models.Post ?? mongoose.model<IPost>('Post', PostSchema)