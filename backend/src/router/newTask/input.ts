import { z } from 'zod'

export const zNewTaskTrpcInput = z.object({
  title: z.string().min(1),
  description: z.string(),
  priority: z.enum(['high', 'medium', 'low']),
  status: z.enum(['to-do', 'in-progress', 'completed', 'cancelled']),
})
