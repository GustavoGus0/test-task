import { trpc } from '../../lib/trpc'

import { zNewTaskTrpcInput } from './input'

export const newTaskTrpcRoute = trpc.procedure
  .input(zNewTaskTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const { title, description, priority, status } = input
    await ctx.prisma.task.create({
      data: {
        title,
        description,
        priority,
        status,
      },
    })

    return true
  })
