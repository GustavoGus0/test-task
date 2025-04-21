import { initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import { type Express } from 'express'
import superjson from 'superjson'

import { type TrpcRouter } from '../router'
import { ExpressRequest } from '../utils/types'

import { AppContext } from './ctx'

const getCreateTrpcContext =
  (appContext: AppContext) =>
  ({ req }: trpcExpress.CreateExpressContextOptions) => {
    return {
      ...appContext,
      me: (req as ExpressRequest).user || null,
    }
  }

type TrpcContext = ReturnType<typeof getCreateTrpcContext>

export const trpc = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
})

export const applyTrpcToExpressApp = async (
  expressApp: Express,
  appContext: AppContext,
  trpcRouter: TrpcRouter
) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: getCreateTrpcContext(appContext),
    })
  )
}
