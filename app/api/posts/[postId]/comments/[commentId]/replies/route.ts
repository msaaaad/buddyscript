import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongoose'
import { requireAuth } from '@/lib/auth-utils'
import { addReplyService } from '@/lib/services/post.service'

export async function POST(req: NextRequest, { params }: { params: Promise<{ postId: string; commentId: string }> }) {
  try {
    await connectDB()
    const user = await requireAuth()
    const { postId, commentId } = await params
    const { content } = await req.json()

    if (!content?.trim()) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    const post = await addReplyService(postId, commentId, user.id, content)
    const comment = post.comments.id(commentId)
    return NextResponse.json({ replies: comment?.replies }, { status: 201 })
  } catch (err: any) {
    if (err.message === 'UNAUTHORIZED') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    if (err.message === 'POST_NOT_FOUND') return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    if (err.message === 'COMMENT_NOT_FOUND') return NextResponse.json({ error: 'Comment not found' }, { status: 404 })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}