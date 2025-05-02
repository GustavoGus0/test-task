import { trpc } from '../../lib/trpc'

import { zGetTasksTrpcInput } from './input'

export const getTasksTrpcRoute = trpc.procedure
  .input(zGetTasksTrpcInput)
  .query(async ({ ctx, input }) => {
    if (!ctx.me) {
      throw new Error('UNAUTHORIZED')
    }
    const { byTasks, byDate, byPriority, byStatus, byTime } = input ?? {}

    const defineDateFilter = () => {
      if (byTime === 'on-today') {
        const oneDayAgo = new Date()
        oneDayAgo.setDate(oneDayAgo.getDate() - 1)
        return { gte: oneDayAgo }
      } else if (byTime === 'on-week') {
        const oneWeekAgo = new Date()
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
        return { gte: oneWeekAgo }
      }
    }

    const defineAssignedToIdFilter = () => {
      if (ctx.me?.role === 'MANAGER') {
        return byTasks === 'my'
          ? ctx.me.id
          : byTasks === 'executors'
            ? { not: ctx.me.id }
            : undefined
      } else if (ctx.me?.role === 'EXECUTOR' && ctx.me?.managerId !== null) {
        return ctx.me.id
      } else {
        return ctx.me?.id
      }
    }

    const defineCreatedByIdFilter = () => {
      if (ctx.me?.role === 'MANAGER') {
        return ctx.me.id
      } else if (ctx.me?.role === 'EXECUTOR' && ctx.me?.managerId !== null) {
        return byTasks === 'my' ? ctx.me.id : byTasks === 'managers' ? ctx.me.managerId : undefined
      } else {
        return ctx.me?.id
      }
    }

    const tasks = await ctx.prisma.task.findMany({
      where: {
        createdById: defineCreatedByIdFilter(),
        assignedToId: defineAssignedToIdFilter(),
        priority: byPriority || undefined,
        status: byStatus ? byStatus : { notIn: ['completed', 'cancelled'] },
        createdAt: defineDateFilter(),
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
        createdById: true,
        assignedToId: true,
      },
      orderBy: {
        createdAt: byDate === 'new' ? 'desc' : 'asc',
      },
    })
    return { tasks }
  })
