import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongoose'
import { requireAuth } from '@/lib/auth-utils'
import { togglePostLikeService } from '@/lib/services/post.service'

export async function POST(req: NextRequest, { params }: { params: Promise<{ postId: string }> }) {
  try {
    await connectDB()
    const user = await requireAuth()
    const { postId } = await params
    const post = await togglePostLikeService(postId, user.id)
    return NextResponse.json({ likes: post.likes })
  } catch (err: any) {
    if (err.message === 'UNAUTHORIZED') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    if (err.message === 'POST_NOT_FOUND') return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}