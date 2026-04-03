import { createComment, findCommentById, deleteComment } from '@/lib/repositories/comment.repository'

export async function addCommentService(data: {
  postId: string
  parentId: string | null
  authorId: string
  content: string
}) {
  if (!data.content.trim()) throw new Error('CONTENT_REQUIRED')
  return createComment(data)
}

export async function deleteCommentService(commentId: string, userId: string) {
  return deleteComment(commentId, userId)
}