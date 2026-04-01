import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongoose'
import { loginSchema } from '@/lib/validations/auth'
import { loginUser, COOKIE_NAME } from '@/lib/services/auth.service'

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const body = await req.json()
    const parsed = loginSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { token } = await loginUser(parsed.data)

    const response = NextResponse.json({ success: true })

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return response
  } catch (err: any) {
    if (err.message === 'INVALID_CREDENTIALS') {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}