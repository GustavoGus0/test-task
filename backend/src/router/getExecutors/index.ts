import { trpc } from '../../lib/trpc'

export const getExecutorsTrpcRoute = trpc.procedure.query(({ ctx }) => {
  if (ctx.me === null) {
    throw new Error('UNAUTHORIZED')
  }
  const executors = ctx.prisma.user.findMany({
    where: {
      managerId: ctx.me?.id,
      role: 'EXECUTOR',
    },
  })
  return executors
})
