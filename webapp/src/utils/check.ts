import { TrpcRouterOutput } from '@management/backend/src/router'
import { TaskStatus } from '@management/backend/src/utils/types'

export const checkMyTask = (
  me: TrpcRouterOutput['getMe']['me'],
  task: TrpcRouterOutput['getTask']['task']
) => {
  return me && me.id === task.createdById
}

export const checkMyOrManagersTask = (
  me: TrpcRouterOutput['getMe']['me'],
  task: TrpcRouterOutput['getTask']['task']
) => {
  return (
    task.assignedToId === me?.id ||
    task.createdById === me?.managerId ||
    task.createdById === me?.id
  )
}
export const checkStatus = (
  task: TrpcRouterOutput['getTask']['task'],
  tasks: Array<TaskStatus>
) => {
  return tasks.map((status) => status === task.status).includes(true)
}
