import { trpc } from '../lib/trpc'

import { getStringTrpcRoute } from './getString'

export const trpcRouter = trpc.router({
  getString: getStringTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
