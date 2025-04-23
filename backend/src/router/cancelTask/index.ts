import { trpc } from '../../lib/trpc'

import { zCancelTaskTrpcInput } from './input'

export const cancelTaskTrpcRoute = trpc.procedure
  .input(zCancelTaskTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const { taskId } = input
    const task = await ctx.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    })
    if (!task) {
      throw new Error('Task not found')
    }
    await ctx.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        status: 'cancelled',
      },
    })
  })
