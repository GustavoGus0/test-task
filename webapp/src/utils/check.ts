import { TrpcRouterOutput } from '@management/backend/src/router'
import { TaskStatus } from '@management/backend/src/utils/types'

export const checkMyIdea = (
  me: TrpcRouterOutput['getMe']['me'],
  task: TrpcRouterOutput['getTask']['task']
) => {
  return me && me.id === task.createdById
}

export const checkStatus = (
  task: TrpcRouterOutput['getTask']['task'],
  tasks: Array<TaskStatus>
) => {
  return tasks.map((status) => status === task.status).includes(true)
}
