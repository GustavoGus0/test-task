import { trpc } from '../../lib/trpc'

import { zGetTasksTrpcInput } from './input'

export const getTasksTrpcRoute = trpc.procedure
  .input(zGetTasksTrpcInput)
  .query(async ({ ctx, input }) => {
    if (!ctx.me) {
      throw new Error('UNAUTHORIZED')
    }

    if (input && ctx.me.managerId !== null) {
      const { byTasks, byDate, byPriority, byStatus } = input
      const tasks = await ctx.prisma.task.findMany({
        where: {
          authorId: byTasks === 'my' ? ctx.me.id : ctx.me.managerId,
          priority: byPriority || undefined,
          status: byStatus ? byStatus : { not: 'completed' },
        },
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          priority: true,
          authorId: true,
        },
        orderBy: {
          createdAt: byDate === 'new' ? 'desc' : 'asc',
        },
      })
      return { tasks }
    } else if (input) {
      const { byDate, byPriority, byStatus } = input
      const tasks = await ctx.prisma.task.findMany({
        where: {
          authorId: ctx.me.id,
          priority: byPriority || undefined,
          status: byStatus ? byStatus : { notIn: ['completed', 'cancelled'] },
        },
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          priority: true,
          authorId: true,
        },
        orderBy: {
          createdAt: byDate === 'new' ? 'desc' : 'asc',
        },
      })
      return { tasks }
    }
  })
