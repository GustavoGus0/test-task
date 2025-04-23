import { z } from 'zod'

export const zChangeTaskStatusTrpcInput = z.object({
  taskId: z.string().uuid(),
  status: z.enum(['in-progress', 'completed']),
})
