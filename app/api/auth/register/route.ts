import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongoose'
import { registerSchema } from '@/lib/validations/auth'
import { registerUser } from '@/lib/services/auth.service'
import { loginUser, COOKIE_NAME } from '@/lib/services/auth.service'

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const body = await req.json()
    const parsed = registerSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues },
        { status: 400 }
      )
    }

    await registerUser(parsed.data)

    const { token } = await loginUser({
      email: parsed.data.email,
      password: parsed.data.password,
    })

    const response = NextResponse.json({ success: true }, { status: 201 })

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return response
  } catch (err: any) {
    if (err.message === 'EMAIL_TAKEN') {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
