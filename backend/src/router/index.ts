import { inferRouterOutputs } from '@trpc/server'

import { trpc } from '../lib/trpc'

import { cancelTaskTrpcRoute } from './cancelTask'
import { changeTaskStatusTrpcRoute } from './changeTaskStatus'
import { deleteTaskTrpcRoute } from './deleteTask'
import { getManagersTrpcRoute } from './getManagers'
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
  cancelTask: cancelTaskTrpcRoute,
  changeTaskStatus: changeTaskStatusTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  getMe: getMeTrpcRoute,
  getManagers: getManagersTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
