import { trpc } from '../../lib/trpc'

export const getManagersTrpcRoute = trpc.procedure.query(({ ctx }) => {
  const managers = ctx.prisma.user.findMany({
    where: {
      role: 'MANAGER',
    },
  })
  return managers
})
