import { z } from 'zod'

export const zGetTasksTrpcInput = z
  .object({
    byTasks: z.enum(['all', 'my', 'executors']).optional(),
    byDate: z.enum(['new', 'old']).optional(),
    byPriority: z.enum(['high', 'medium', 'low']).optional(),
    byStatus: z.enum(['to-do', 'in-progress', 'completed', 'cancelled']).optional(),
  })
  .nullable()
