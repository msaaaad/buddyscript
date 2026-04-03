import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongoose'
import { requireAuth } from '@/lib/auth-utils'
import { toggleReactionService, getReactorsService } from '@/lib/services/reaction.service'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const user = await requireAuth()
    const { targetId, targetType } = await req.json()
    if (!targetId || !targetType) return NextResponse.json({ error: 'targetId and targetType required' }, { status: 400 })
    const result = await toggleReactionService({ targetId, targetType, userId: user.id })
    return NextResponse.json(result)
  } catch (err: any) {
    if (err.message === 'UNAUTHORIZED') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    await requireAuth()
    const { searchParams } = new URL(req.url)
    const targetId = searchParams.get('targetId')
    const targetType = searchParams.get('targetType') as 'post' | 'comment'
    if (!targetId || !targetType) return NextResponse.json({ error: 'targetId and targetType required' }, { status: 400 })
    const reactors = await getReactorsService(targetId, targetType)
    return NextResponse.json({ reactors })
  } catch (err: any) {
    if (err.message === 'UNAUTHORIZED') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}