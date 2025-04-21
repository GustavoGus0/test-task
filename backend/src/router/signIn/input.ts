import { z } from 'zod'

export const zSignInTrpcInput = z.object({
  login: z.string().min(1, 'Тут пусто'),
  password: z.string().min(1, 'Тут пусто'),
})
