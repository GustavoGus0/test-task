import { trpc } from '../../lib/trpc'

import { zGetManagersTrpcInput } from './input'

export const getManagersTrpcRoute = trpc.procedure
  .input(zGetManagersTrpcInput)
  .query(async ({ ctx, input }) => {
    if (ctx.me && ctx.me.managerId && input.myManager) {
      const manager = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.me.managerId,
          role: 'MANAGER',
        },
      })
      return { manager }
    } else {
      const managers = await ctx.prisma.user.findMany({
        where: {
          role: 'MANAGER',
        },
      })
      return { managers }
    }
  })
