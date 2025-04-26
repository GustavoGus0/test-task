import { z } from 'zod'

export const zSignInTrpcInput = z.object({
  login: z.string().trim().min(1, 'Тут пусто'),
  password: z.string().trim().min(1, 'Тут пусто'),
})
