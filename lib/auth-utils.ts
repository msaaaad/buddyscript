import { cookies } from 'next/headers'
import { verifyToken, COOKIE_NAME } from '@/lib/services/auth.service'

export async function getAuthUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value

  if (!token) return null

  try {
    const payload = await verifyToken(token)
    return {
      id: payload.sub as string,
      _id: payload.sub as string,
      email: payload.email as string,
      firstName: payload.firstName as string,
      lastName: payload.lastName as string,
    }
  } catch {
    return null
  }
}

export async function requireAuth() {
  const user = await getAuthUser()
  if (!user) throw new Error('UNAUTHORIZED')
  return user
}