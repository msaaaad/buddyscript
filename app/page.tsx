import { redirect } from 'next/navigation'
import { getAuthUser } from '@/lib/auth-utils'

export default async function RootPage() {
  const user = await getAuthUser()

  if (user) {
    redirect('/feed')
  } else {
    redirect('/login')
  }
}