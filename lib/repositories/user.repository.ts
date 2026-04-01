import { User, IUser } from '@/lib/models/User'

export async function findUserByEmail(email: string): Promise<IUser | null> {
  return User.findOne({ email }).lean() as Promise<IUser | null>
}

export async function findUserById(id: string): Promise<IUser | null> {
  return User.findById(id).lean() as Promise<IUser | null>
}

export async function createUser(data: {
  firstName: string
  lastName: string
  email: string
  passwordHash: string
}): Promise<IUser> {
  const user = new User(data)
  return user.save()
}