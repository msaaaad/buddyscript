import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { findUserByEmail, createUser } from '@/lib/repositories/user.repository'
import { RegisterInput, LoginInput } from '@/lib/validations/auth'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)
const COOKIE_NAME = 'auth_token'
const TOKEN_EXPIRY = '7d'

export async function registerUser(input: RegisterInput) {
  const existing = await findUserByEmail(input.email)
  if (existing) {
    throw new Error('EMAIL_TAKEN')
  }

  const passwordHash = await bcrypt.hash(input.password, 12)
  const user = await createUser({
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    passwordHash,
  })

  return user
}

export async function loginUser(input: LoginInput) {
  const user = await findUserByEmail(input.email)
  if (!user) {
    throw new Error('INVALID_CREDENTIALS')
  }

  const isMatch = await bcrypt.compare(input.password, user.passwordHash)
  if (!isMatch) {
    throw new Error('INVALID_CREDENTIALS')
  }

  const token = await new SignJWT({
    sub: user._id.toString(),
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(TOKEN_EXPIRY)
    .setIssuedAt()
    .sign(JWT_SECRET)

  return { token, user }
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, JWT_SECRET)
  return payload
}

export { COOKIE_NAME }