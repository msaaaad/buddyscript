import { NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/auth-utils'

export async function GET() {
  try {
    const user = await getAuthUser()
      if (!user) return NextResponse.json({ user: null }, { status: 401 })
      return NextResponse.json({
          user: {
              id: user.id as string,
              _id: user.id as string,
              email: user.email as string,
              firstName: user.firstName as string,
              lastName: user.lastName as string,
          }
      })
  } catch {
    return NextResponse.json({ user: null }, { status: 401 })
  }
}