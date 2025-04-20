import { trpc } from '../../lib/trpc'

export const getTasksTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  const tasks = await ctx.prisma.task.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      priority: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return { tasks }
})
