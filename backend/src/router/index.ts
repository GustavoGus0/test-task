import { trpc } from '../lib/trpc'

import { getTasksTrpcRoute } from './getTasks'
import { newTaskTrpcRoute } from './newTask'

export const trpcRouter = trpc.router({
  getTasks: getTasksTrpcRoute,
  newTask: newTaskTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
