import { inferRouterOutputs } from '@trpc/server'

import { trpc } from '../lib/trpc'

import { deleteTaskTrpcRoute } from './deleteTask'
import { getMeTrpcRoute } from './getMe'
import { getTaskTrpcRoute } from './getTask'
import { getTasksTrpcRoute } from './getTasks'
import { newTaskTrpcRoute } from './newTask'
import { signInTrpcRoute } from './signIn'
import { signUpTrpcRoute } from './signUp'

export const trpcRouter = trpc.router({
  getTasks: getTasksTrpcRoute,
  getTask: getTaskTrpcRoute,
  newTask: newTaskTrpcRoute,
  deleteTask: deleteTaskTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  getMe: getMeTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
