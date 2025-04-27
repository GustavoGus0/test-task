import { trpc } from '../../lib/trpc'

import { zGetTasksTrpcInput } from './input'

export const getTasksTrpcRoute = trpc.procedure
  .input(zGetTasksTrpcInput)
  .query(async ({ ctx, input }) => {
    if (!ctx.me) {
      throw new Error('UNAUTHORIZED')
    }

    if (input && ctx.me.role === 'EXECUTOR' && ctx.me.managerId === null) {
      const { byTasks, byDate, byPriority, byStatus, byTime } = input

      let dateFilter = {}
      if (byTime === 'on-today') {
        const oneDayAgo = new Date()
        oneDayAgo.setDate(oneDayAgo.getDate() - 1)
        dateFilter = { gte: oneDayAgo }
      } else if (byTime === 'on-week') {
        const oneWeekAgo = new Date()
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
        dateFilter = { gte: oneWeekAgo }
      }

      const tasks = await ctx.prisma.task.findMany({
        where: {
          createdById: ctx.me.id,
          assignedToId: byTasks === 'executors' ? { not: ctx.me.id } : ctx.me.id,
          priority: byPriority || undefined,
          status: byStatus ? byStatus : { notIn: ['completed', 'cancelled'] },
          createdAt: dateFilter,
        },
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          priority: true,
          createdById: true,
          createdBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              patronymic: true,
            },
          },
          assignedTo: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              patronymic: true,
            },
          },
        },
        orderBy: {
          createdAt: byDate === 'new' ? 'desc' : 'asc',
        },
      })
      return { tasks }
    } else if (input && ctx.me.role === 'EXECUTOR' && ctx.me.managerId !== null) {
      const { byTasks, byDate, byPriority, byStatus, byTime } = input

      let dateFilter = {}
      if (byTime === 'on-today') {
        const oneDayAgo = new Date()
        oneDayAgo.setDate(oneDayAgo.getDate() - 1)
        dateFilter = { gte: oneDayAgo }
      } else if (byTime === 'on-week') {
        const oneWeekAgo = new Date()
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
        dateFilter = { gte: oneWeekAgo }
      }

      const tasks = await ctx.prisma.task.findMany({
        where: {
          createdById:
            byTasks === 'all' ? undefined : byTasks === 'managers' ? ctx.me.managerId : ctx.me.id,
          assignedToId: byTasks === 'executors' ? { not: ctx.me.id } : ctx.me.id,
          priority: byPriority || undefined,
          status: byStatus ? byStatus : { notIn: ['completed', 'cancelled'] },
          createdAt: dateFilter,
        },
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          priority: true,
          createdById: true,
          createdBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              patronymic: true,
            },
          },
          assignedTo: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              patronymic: true,
            },
          },
        },
        orderBy: {
          createdAt: byDate === 'new' ? 'desc' : 'asc',
        },
      })
      return { tasks }
    } else if (input && ctx.me.role === 'MANAGER') {
      const { byTasks, byDate, byPriority, byStatus, byTime } = input
      let dateFilter = {}
      if (byTime === 'on-today') {
        const oneDayAgo = new Date()
        oneDayAgo.setDate(oneDayAgo.getDate() - 1)
        dateFilter = { gte: oneDayAgo }
      } else if (byTime === 'on-week') {
        const oneWeekAgo = new Date()
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
        dateFilter = { gte: oneWeekAgo }
      }
      const tasks = await ctx.prisma.task.findMany({
        where: {
          createdById: ctx.me.id,
          assignedToId:
            byTasks === 'all'
              ? undefined
              : byTasks === 'executors'
                ? { not: ctx.me.id }
                : ctx.me.id,
          priority: byPriority || undefined,
          status: byStatus ? byStatus : { notIn: ['completed', 'cancelled'] },
          createdAt: dateFilter,
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
    }
    return null
  })
