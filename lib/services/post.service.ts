import {
  createPost,
  getPosts,
  findPostById,
  togglePostLike,
  addComment,
  toggleCommentLike,
  addReply,
  toggleReplyLike,
  deletePost,
  deleteComment,
  deleteReply,
} from '@/lib/repositories/post.repository'

export async function createPostService(data: {
  authorId: string
  content: string
  imageUrl?: string
  visibility: 'public' | 'private'
}) {
  if (!data.content.trim()) throw new Error('CONTENT_REQUIRED')
  return createPost(data)
}

export async function getPostsService(viewerId: string) {
  return getPosts(viewerId)
}

export async function togglePostLikeService(postId: string, userId: string) {
  return togglePostLike(postId, userId)
}

export async function addCommentService(postId: string, authorId: string, content: string) {
  if (!content.trim()) throw new Error('CONTENT_REQUIRED')
  return addComment(postId, { authorId, content })
}

export async function toggleCommentLikeService(postId: string, commentId: string, userId: string) {
  return toggleCommentLike(postId, commentId, userId)
}

export async function addReplyService(
  postId: string,
  commentId: string,
  authorId: string,
  content: string
) {
  if (!content.trim()) throw new Error('CONTENT_REQUIRED')
  return addReply(postId, commentId, { authorId, content })
}

export async function toggleReplyLikeService(
  postId: string,
  commentId: string,
  replyId: string,
  userId: string
) {
  return toggleReplyLike(postId, commentId, replyId, userId)
}

export async function deletePostService(postId: string, userId: string) {
  return deletePost(postId, userId)
}

export async function deleteCommentService(postId: string, commentId: string, userId: string) {
  return deleteComment(postId, commentId, userId)
}

export async function deleteReplyService(postId: string, commentId: string, replyId: string, userId: string) {
  return deleteReply(postId, commentId, replyId, userId)
}