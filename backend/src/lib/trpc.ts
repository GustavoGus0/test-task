import { initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import type { Express } from 'express'

import { TrpcRouter } from '../router'

import { AppContext } from './ctx'

export const trpc = initTRPC.context<AppContext>().create()

export const applyTrpcToExpressApp = (
  app: Express,
  trpcRouter: TrpcRouter,
  appContext: AppContext
) => {
  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: () => appContext,
    })
  )
}
