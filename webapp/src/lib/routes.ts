const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<
    keyof T,
    string
  >
}

export const getTasksRoute = () => '/'

export const viewTaskRouteParams = getRouteParams({ taskId: true })
export type ViewTaskRouteParams = typeof viewTaskRouteParams
export const getViewTaskRoute = ({ taskId }: ViewTaskRouteParams) => `/tasks/${taskId}`

export const editTaskRouteParams = getRouteParams({ taskId: true })
export type EditTaskRouteParams = typeof viewTaskRouteParams
export const getEditTaskRoute = ({ taskId }: EditTaskRouteParams) => `/tasks/${taskId}/edit`

export const getNewTaskRoute = () => '/new-task'
export const getArchivedTasksRoute = () => '/archived-tasks'
export const getExecutorsRoute = () => '/my-executors'
export const getSignUpRoute = () => '/sign-up'
export const getSignInRoute = () => '/sign-in'
export const getSignOutRoute = () => '/sign-out'
