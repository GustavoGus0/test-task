import { trpc } from '../../lib/trpc'

import { zGetTaskTrpcInput } from './input'

export const getTaskTrpcRoute = trpc.procedure
  .input(zGetTaskTrpcInput)
  .query(async ({ ctx, input }) => {
    const { taskId } = input
    const task = await ctx.prisma.task.findUnique({
      where: {
        id: taskId,
      },
      include: {
        author: {
          select: {
            id: true,
            login: true,
            firstName: true,
            lastName: true,
            patronymic: true,
          },
        },
      },
    })
    if (!task) {
      throw new Error('Task not found')
    }

    return { task }
  })
