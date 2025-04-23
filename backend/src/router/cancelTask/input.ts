import { z } from 'zod'

export const zCancelTaskTrpcInput = z.object({
  taskId: z.string(),
})
