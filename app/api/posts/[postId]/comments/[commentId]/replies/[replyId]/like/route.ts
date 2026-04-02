import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongoose'
import { requireAuth } from '@/lib/auth-utils'
import { toggleReplyLikeService } from '@/lib/services/post.service'

export async function POST(req: NextRequest, { params }: { params: Promise<{ postId: string; commentId: string; replyId: string }> }) {
  try {
    await connectDB()
    const user = await requireAuth()
    const { postId, commentId, replyId } = await params
    const post = await toggleReplyLikeService(postId, commentId, replyId, user.id)
    const comment = post.comments.id(commentId)
    const reply = comment?.replies.id(replyId)
    return NextResponse.json({ likes: reply?.likes })
  } catch (err: any) {
    if (err.message === 'UNAUTHORIZED') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    if (err.message === 'POST_NOT_FOUND') return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    if (err.message === 'COMMENT_NOT_FOUND') return NextResponse.json({ error: 'Comment not found' }, { status: 404 })
    if (err.message === 'REPLY_NOT_FOUND') return NextResponse.json({ error: 'Reply not found' }, { status: 404 })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}