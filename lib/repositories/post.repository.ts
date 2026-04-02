import { Post, IPost, IReply } from '@/lib/models/Post'
import { Types } from 'mongoose'

export async function createPost(data: {
  authorId: string
  content: string
  imageUrl?: string
  visibility: 'public' | 'private'
}): Promise<IPost> {
  const post = new Post(data)
  return post.save()
}

export async function getPosts(viewerId: string) {
  return Post.find({
    $or: [
      { visibility: 'public' },
      { visibility: 'private', authorId: viewerId },
    ],
  })
    .sort({ createdAt: -1 })
    .populate('authorId', 'firstName lastName')
    .populate('comments.authorId', 'firstName lastName')
    .populate('comments.replies.authorId', 'firstName lastName')
    .lean()
}

export async function findPostById(postId: string) {
  return Post.findById(postId)
}

export async function togglePostLike(postId: string, userId: string) {
  const userObjectId = new Types.ObjectId(userId)
  const post = await Post.findById(postId)
  if (!post) throw new Error('POST_NOT_FOUND')

  const alreadyLiked = post.likes.some(id => id.equals(userObjectId))

  if (alreadyLiked) {
    post.likes.pull(userObjectId)
  } else {
    post.likes.addToSet(userObjectId)
  }

  return post.save()
}

export async function addComment(postId: string, data: {
  authorId: string
  content: string
}) {
  const post = await Post.findById(postId)
  if (!post) throw new Error('POST_NOT_FOUND')

  post.comments.push({
    authorId: new Types.ObjectId(data.authorId),
    content: data.content,
    likes: [] as unknown as Types.DocumentArray<Types.ObjectId>,
    replies: [] as unknown as Types.DocumentArray<IReply>,
  })

  return post.save()
}

export async function toggleCommentLike(postId: string, commentId: string, userId: string) {
  const userObjectId = new Types.ObjectId(userId)
  const post = await Post.findById(postId)
  if (!post) throw new Error('POST_NOT_FOUND')

  const comment = post.comments.id(commentId)
  if (!comment) throw new Error('COMMENT_NOT_FOUND')

  const alreadyLiked = comment.likes.some((id: Types.ObjectId) => id.equals(userObjectId))

  if (alreadyLiked) {
    comment.likes.pull(userObjectId)
  } else {
    comment.likes.addToSet(userObjectId)
  }

  return post.save()
}

export async function addReply(postId: string, commentId: string, data: {
  authorId: string
  content: string
}) {
  const post = await Post.findById(postId)
  if (!post) throw new Error('POST_NOT_FOUND')

  const comment = post.comments.id(commentId)
  if (!comment) throw new Error('COMMENT_NOT_FOUND')

  comment.replies.push({
    authorId: new Types.ObjectId(data.authorId),
    content: data.content,
    likes: [] as unknown as Types.DocumentArray<Types.ObjectId>,
  })

  return post.save()
}

export async function toggleReplyLike(
  postId: string,
  commentId: string,
  replyId: string,
  userId: string
) {
  const userObjectId = new Types.ObjectId(userId)
  const post = await Post.findById(postId)
  if (!post) throw new Error('POST_NOT_FOUND')

  const comment = post.comments.id(commentId)
  if (!comment) throw new Error('COMMENT_NOT_FOUND')

  const reply = comment.replies.id(replyId)
  if (!reply) throw new Error('REPLY_NOT_FOUND')

  const alreadyLiked = reply.likes.some((id: Types.ObjectId) => id.equals(userObjectId))

  if (alreadyLiked) {
    reply.likes.pull(userObjectId)
  } else {
    reply.likes.addToSet(userObjectId)
  }

  return post.save()
}

export async function deletePost(postId: string, userId: string) {
  const post = await Post.findById(postId)
  if (!post) throw new Error('POST_NOT_FOUND')
  if (post.authorId.toString() !== userId) throw new Error('FORBIDDEN')
  return Post.findByIdAndDelete(postId)
}

export async function deleteComment(postId: string, commentId: string, userId: string) {
  const post = await Post.findById(postId)
  if (!post) throw new Error('POST_NOT_FOUND')

  const comment = post.comments.id(commentId)
  if (!comment) throw new Error('COMMENT_NOT_FOUND')
  if (comment.authorId.toString() !== userId) throw new Error('FORBIDDEN')

  comment.deleteOne()
  return post.save()
}

export async function deleteReply(postId: string, commentId: string, replyId: string, userId: string) {
  const post = await Post.findById(postId)
  if (!post) throw new Error('POST_NOT_FOUND')

  const comment = post.comments.id(commentId)
  if (!comment) throw new Error('COMMENT_NOT_FOUND')

  const reply = comment.replies.id(replyId)
  if (!reply) throw new Error('REPLY_NOT_FOUND')
  if (reply.authorId.toString() !== userId) throw new Error('FORBIDDEN')

  reply.deleteOne()
  return post.save()
}