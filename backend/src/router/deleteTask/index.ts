import { trpc } from '../../lib/trpc'

import { zDeleteTaskTrpcInput } from './input'

export const deleteTaskTrpcRoute = trpc.procedure
  .input(zDeleteTaskTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const { taskId } = input
    const task = await ctx.prisma.task.findUnique({
      where: { id: taskId },
    })
    if (!task) {
      throw new Error('Task not found')
    }

    await ctx.prisma.task.delete({ where: { id: taskId } })

    return true
  })
