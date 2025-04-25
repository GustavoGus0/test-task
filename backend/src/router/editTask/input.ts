import { z } from 'zod'

import { zNewTaskTrpcInput } from '../newTask/input'

export const zEditTaskTrpcInput = zNewTaskTrpcInput.extend({
  taskId: z.string().min(1),
})
