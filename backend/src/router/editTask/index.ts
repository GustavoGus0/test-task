import { trpc } from '../../lib/trpc'

import { zEditTaskTrpcInput } from './input'

export const editTaskTrpcRoute = trpc.procedure
  .input(zEditTaskTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const { taskId, ...taskInput } = input
    if (!ctx.me) {
      throw new Error('UNAUTHORIZED')
    }
    const task = await ctx.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    })
    if (!task) {
      throw new Error('NOT_FOUND')
    }
    if (task.createdById !== ctx.me.id) {
      throw new Error('YOU_CANNOT_EDIT_THIS_TASK')
    }
    const currentTask = {
      title: taskInput.title,
      description: taskInput.description,
      priority: taskInput.priority,
      status: taskInput.status,
      assignedToId: taskInput.assignedToId,
    }
    if (currentTask === taskInput) {
      throw new Error('Внесите изменения')
    }
    await ctx.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        ...taskInput,
        assignedToId: taskInput.assignedToId || undefined,
      },
    })
  })
