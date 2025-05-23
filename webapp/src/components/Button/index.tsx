import { TaskStatus } from '@management/backend/src/utils/types'
import cn from 'classnames'
import { Link, useNavigate } from 'react-router'

import { icons } from '../../assets/icons'
import { AlertType, useAlerts } from '../../lib/ctx'
import { getArchivedTasksRoute, getEditTaskRoute, getTasksRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

import css from './index.module.scss'

export const EditButton = ({ taskId }: { taskId: string }) => {
  return (
    <Link to={getEditTaskRoute({ taskId })} className={css.button} type="button">
      <div className={css.box}>
        {icons.pencil()}
        <span>Редактировать</span>
      </div>
    </Link>
  )
}

export const DeleteButton = ({
  taskId,
  taskStatus,
}: {
  taskId: string
  taskStatus: TaskStatus
}) => {
  const navigate = useNavigate()
  const deleteTask = trpc.deleteTask.useMutation()
  const setAlerts = useAlerts()
  const newAlert = {
    type: 'delete' as AlertType,
    title: 'Задача удалена',
  }
  return (
    <button
      className={cn({ [css.button]: true, [css.delete]: true })}
      onClick={async () => {
        await deleteTask.mutateAsync({ taskId })
        if (taskStatus === 'to-do' || taskStatus === 'in-progress') {
          navigate(getTasksRoute())
        }
        if (taskStatus === 'completed' || taskStatus === 'cancelled') {
          navigate(getArchivedTasksRoute())
        }
        setAlerts((prev) => [...prev, { ...newAlert, createdAt: new Date() }])
      }}
      type="button"
    >
      <div className={css.box}>
        {icons.trashCan()}
        <span>Удалить</span>
      </div>
    </button>
  )
}

const defineButtonText = (status: 'to-do' | 'in-progress') => {
  if (status === 'in-progress') {
    return ['Завершить', 'completed']
  }
  return ['Начать', 'in-progress']
}

export const ChangeButton = ({ taskId, text }: { taskId: string; text: string }) => {
  const navigate = useNavigate()
  const changeTaskStatus = trpc.changeTaskStatus.useMutation()
  const trpcUtils = trpc.useUtils()
  const setAlerts = useAlerts()
  const newAlert = {
    type: 'success' as AlertType,
    title: text === 'to-do' ? 'Задача взята в работу' : 'Задача выполнена',
  }
  return (
    <button
      onClick={async () => {
        await changeTaskStatus.mutateAsync({
          taskId,
          status: defineButtonText(text as 'to-do' | 'in-progress')[1] as
            | 'in-progress'
            | 'completed',
        })
        trpcUtils.getTask.invalidate()
        setAlerts((prev) => [...prev, { ...newAlert, createdAt: new Date() }])
        if (text === 'in-progress') {
          navigate(getTasksRoute())
        }
      }}
      className={cn({ [css.button]: true, [css.change]: true })}
    >
      {defineButtonText(text as 'to-do' | 'in-progress')[0]}
    </button>
  )
}

export const CancelButton = ({ taskId }: { taskId: string }) => {
  const cancelTask = trpc.cancelTask.useMutation()
  const trpcUtils = trpc.useUtils()
  const setAlerts = useAlerts()
  const newAlert = {
    type: 'cancel' as AlertType,
    title: 'Задача отменена',
  }
  return (
    <button
      onClick={async () => {
        await cancelTask.mutateAsync({ taskId })
        trpcUtils.getTask.invalidate()
        history.back()
        setAlerts((prev) => [...prev, { ...newAlert, createdAt: new Date() }])
      }}
      className={cn({ [css.button]: true, [css.cancel]: true })}
    >
      <div className={css.box}>
        {icons.cross()}
        <span>Отменить</span>
      </div>
    </button>
  )
}
