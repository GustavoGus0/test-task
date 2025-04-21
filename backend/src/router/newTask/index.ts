import { trpc } from '../../lib/trpc'

import { zNewTaskTrpcInput } from './input'

export const newTaskTrpcRoute = trpc.procedure
  .input(zNewTaskTrpcInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me) {
      throw new Error('UNAUTHORIZED')
    }
    await ctx.prisma.task.create({
      data: {
        ...input,
        authorId: ctx.me.id,
      },
    })

    return true
  })
