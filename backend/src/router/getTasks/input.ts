import { z } from 'zod'

export const zGetTasksTrpcInput = z
  .object({
    byTasks: z.enum(['all', 'my', 'executors']).nullable(),
    byDate: z.enum(['new', 'old']).nullable(),
    byPriority: z.enum(['high', 'medium', 'low']).nullable(),
    byStatus: z.enum(['to-do', 'in-progress', 'completed', 'cancelled']).nullable(),
  })
  .nullable()
