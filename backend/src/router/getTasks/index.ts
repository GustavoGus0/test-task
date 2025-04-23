import { trpc } from '../../lib/trpc'

import { zGetTasksTrpcInput } from './input'

export const getTasksTrpcRoute = trpc.procedure
  .input(zGetTasksTrpcInput)
  .query(async ({ ctx, input }) => {
    if (input) {
      const { byTasks, byDate, byPriority, byStatus } = input
      const tasks = await ctx.prisma.task.findMany({
        where: {
          authorId: byTasks === 'my' ? ctx.me?.id : undefined,
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
    }
    const tasks = await ctx.prisma.task.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
        authorId: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return { tasks }
  })
