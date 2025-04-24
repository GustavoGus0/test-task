import { z } from 'zod'

export const zGetManagersTrpcInput = z.object({
  myManager: z.boolean().optional(),
})
