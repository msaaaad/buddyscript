import { z } from 'zod'

export const registerSchema = z.object({
  firstName: z.string().min(1).max(50).trim(),
  lastName:  z.string().min(1).max(50).trim(),
  email:     z.email().toLowerCase(),
  password:  z.string().min(8).max(100),
})

export const loginSchema = z.object({
  email:    z.string().email().toLowerCase(),
  password: z.string().min(1),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput    = z.infer<typeof loginSchema>