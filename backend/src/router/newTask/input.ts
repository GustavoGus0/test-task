import { z } from 'zod'

export const zNewTaskTrpcInput = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Заголовок не может быть пустым')
    .max(60, 'Слишком длинный заголовок'),
  description: z.string().trim(),
  priority: z
    .enum(['high', 'medium', 'low'], {
      errorMap: () => ({ message: 'Нужно выбрать приоритет задачи' }),
    })
    .nullable()
    .refine((val) => val !== null, 'Нужно выбрать приоритет задачи'),
  status: z.enum(['to-do', 'in-progress', 'completed', 'cancelled']),
  assignedToId: z.string().nullable(),
})
