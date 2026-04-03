import { Comment, IComment } from '@/lib/models/Comment'
import mongoose from 'mongoose'

export async function createComment(data: {
  postId: string
  parentId: string | null
  authorId: string
  content: string
}): Promise<IComment> {
  const comment = new Comment(data)
  return comment.save()
}

export async function getCommentsByPost(postId: string) {
  return Comment.find({ postId, parentId: null })
    .sort({ createdAt: 1 })
    .populate('authorId', 'firstName lastName')
    .lean()
}

export async function getRepliesByComment(commentId: string) {
  return Comment.find({ parentId: commentId })
    .sort({ createdAt: 1 })
    .populate('authorId', 'firstName lastName')
    .lean()
}

export async function getRepliesForComments(commentIds: string[]) {
  return Comment.find({ parentId: { $in: commentIds } })
    .sort({ createdAt: 1 })
    .populate('authorId', 'firstName lastName')
    .lean()
}

export async function findCommentById(commentId: string) {
  return Comment.findById(commentId)
}

export async function deleteComment(commentId: string, userId: string) {
  const comment = await Comment.findById(commentId)
  if (!comment) throw new Error('COMMENT_NOT_FOUND')
  if (comment.authorId.toString() !== userId) throw new Error('FORBIDDEN')
  await Comment.deleteMany({
    $or: [
      { _id: commentId },
      { parentId: commentId },
    ]
  })
}