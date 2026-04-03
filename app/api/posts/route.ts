import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongoose'
import { requireAuth } from '@/lib/auth-utils'
import { createPostService, getPostsService } from '@/lib/services/post.service'

export async function GET() {
  try {
    await connectDB()
    const user = await requireAuth()
    const posts = await getPostsService(user.id)
    return NextResponse.json({ posts })
  } catch (err: any) {
    if (err.message === 'UNAUTHORIZED') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const user = await requireAuth()
    const body = await req.json()
    const { content, imageUrl, visibility = 'public' } = body
    if (!content?.trim()) return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    const post = await createPostService({ authorId: user.id, content, imageUrl, visibility })
    return NextResponse.json({ post }, { status: 201 })
  } catch (err: any) {
    if (err.message === 'UNAUTHORIZED') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}