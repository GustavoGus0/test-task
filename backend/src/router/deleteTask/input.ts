import { z } from 'zod'

export const zDeleteTaskTrpcInput = z.object({
  taskId: z.string(),
})
