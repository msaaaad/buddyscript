import { createPost, getPosts, deletePost } from '@/lib/repositories/post.repository'
import { getReactionCounts, getUserReactions } from '@/lib/repositories/reaction.repository'
import { getCommentsByPost, getRepliesForComments } from '@/lib/repositories/comment.repository'
import { getReactionCounts as getCommentReactionCounts, getUserReactions as getUserCommentReactions } from '@/lib/repositories/reaction.repository'

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
  const posts = await getPosts(viewerId)
  if (posts.length === 0) return []

  const postIds = posts.map((p: any) => p._id.toString())

  const [reactionCounts, userReactions, allComments] = await Promise.all([
    getReactionCounts(postIds, 'post'),
    getUserReactions(postIds, 'post', viewerId),
    getCommentsByPost_bulk(postIds),
  ])

  const commentIds = allComments.map((c: any) => c._id.toString())
  const [commentReactionCounts, userCommentReactions, allReplies] = await Promise.all([
    getCommentReactionCounts(commentIds, 'comment'),
    getUserCommentReactions(commentIds, 'comment', viewerId),
    getRepliesForComments(commentIds),
  ])

  const replyIds = allReplies.map((r: any) => r._id.toString())
  const [replyReactionCounts, userReplyReactions] = await Promise.all([
    getCommentReactionCounts(replyIds, 'comment'),
    getUserCommentReactions(replyIds, 'comment', viewerId),
  ])

  const commentsByPost: Record<string, any[]> = {}
  for (const comment of allComments) {
    const pid = (comment as any).postId.toString()
    if (!commentsByPost[pid]) commentsByPost[pid] = []
    commentsByPost[pid].push({
      ...comment,
      likeCount: commentReactionCounts[(comment as any)._id.toString()] ?? 0,
      isLiked: userCommentReactions.has((comment as any)._id.toString()),
      replies: [],
    })
  }

  const repliesByComment: Record<string, any[]> = {}
  for (const reply of allReplies) {
    const cid = (reply as any).parentId.toString()
    if (!repliesByComment[cid]) repliesByComment[cid] = []
    repliesByComment[cid].push({
      ...reply,
      likeCount: replyReactionCounts[(reply as any)._id.toString()] ?? 0,
      isLiked: userReplyReactions.has((reply as any)._id.toString()),
    })
  }

  for (const postComments of Object.values(commentsByPost)) {
    for (const comment of postComments) {
      comment.replies = repliesByComment[comment._id.toString()] ?? []
    }
  }

  return posts.map((post: any) => ({
    ...post,
    likeCount: reactionCounts[post._id.toString()] ?? 0,
    isLiked: userReactions.has(post._id.toString()),
    comments: commentsByPost[post._id.toString()] ?? [],
  }))
}

export async function deletePostService(postId: string, userId: string) {
  return deletePost(postId, userId)
}

async function getCommentsByPost_bulk(postIds: string[]) {
  const { Comment } = await import('@/lib/models/Comment')
  return Comment.find({ postId: { $in: postIds }, parentId: null })
    .sort({ createdAt: 1 })
    .populate('authorId', 'firstName lastName')
    .lean()
}