import { trpc } from '../../lib/trpc'

export const getStringTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  const tasks = await ctx.prisma.task.findMany({
    select: {
      id: true,
      title: true,
      description: true,
    },
  })
  return tasks
})
