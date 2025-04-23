import { trpc } from '../../lib/trpc'

import { zChangeTaskStatusTrpcInput } from './input'

export const changeTaskStatusTrpcRoute = trpc.procedure
  .input(zChangeTaskStatusTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const { taskId, status } = input
    const task = await ctx.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    })
    if (!task) {
      throw new Error('Task not found')
    }
    if (task.status === 'to-do' && status === 'in-progress') {
      await ctx.prisma.task.update({
        where: {
          id: taskId,
        },
        data: {
          status: status,
        },
      })
    } else if (task.status === 'in-progress' && status === 'completed') {
      await ctx.prisma.task.update({
        where: {
          id: taskId,
        },
        data: {
          status: status,
          completedAt: new Date(),
        },
      })
    } else {
      throw new Error('Invalid status transition')
    }
  })
