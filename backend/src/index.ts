import cors from 'cors'
import express from 'express'

import { AppContext, createAppContext } from './lib/ctx'
import { env } from './lib/env'
import { applyPassportToExpressApp } from './lib/passport'
import { applyTrpcToExpressApp } from './lib/trpc'
import { trpcRouter } from './router'

void (async () => {
  let ctx: AppContext | null = null
  try {
    ctx = createAppContext()
    const expressApp = express()
    expressApp.use(cors())
    applyPassportToExpressApp(expressApp, ctx)
    await applyTrpcToExpressApp(expressApp, ctx, trpcRouter)
    expressApp.listen(env.PORT, () => {
      // eslint-disable-next-line no-console
      console.info(`Listening on http://localhost:${env.PORT}`)
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    await ctx?.stop()
  }
})()
