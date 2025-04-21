import { trpc } from '../../lib/trpc'
import { toClientMe } from '../../utils/toClientMe'

export const getMeTrpcRoute = trpc.procedure.query(({ ctx }) => {
  return { me: toClientMe(ctx.me) }
})
