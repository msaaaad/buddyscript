'use client'

import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/contexts/AuthContext'
import { http } from '@/lib/http-client'

interface AuthUser {
  id: string
  _id: string
  email: string
  firstName: string
  lastName: string
}

export function useAuth() {
  const { user, isLoading, setUser } = useAuthContext()
  const router = useRouter()

  async function login(email: string, password: string) {
    await http.post('/auth/login', { email, password })
    const { user } = await http.get<{ user: AuthUser }>('/auth/me')
    setUser(user)
    router.push('/feed')
  }

  async function register(data: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) {
    await http.post('/auth/register', data)
    const { user } = await http.get<{ user: AuthUser }>('/auth/me')
    setUser(user)
    router.push('/feed')
  }

  async function logout() {
    await http.post('/auth/logout')
    setUser(null)
    router.push('/login')
  }

  return { user, isLoading, login, register, logout }
}