import { z } from 'zod'

export const zSignInTrpcInput = z.object({
  login: z.string(),
  password: z.string(),
})
