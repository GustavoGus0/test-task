import cn from 'classnames'
import { useNavigate } from 'react-router'

import { icons } from '../../assets/icons'
import { getTasksRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

import css from './index.module.scss'

export const EditButton = () => {
  return (
    <button className={css.button} type="button">
      <div className={css.box}>
        {icons.pencil()}
        <span>Редактировать</span>
      </div>
    </button>
  )
}

export const DeleteButton = ({ taskId }: { taskId: string }) => {
  const navigate = useNavigate()
  const deleteTask = trpc.deleteTask.useMutation()
  return (
    <button
      className={cn({ [css.button]: true, [css.delete]: true })}
      onClick={async () => {
        await deleteTask.mutateAsync({ taskId })
        navigate(getTasksRoute())
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
  const changeTaskStatus = trpc.changeTaskStatus.useMutation()
  const trpcUtils = trpc.useUtils()
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
  return (
    <button
      onClick={async () => {
        await cancelTask.mutateAsync({ taskId })
        trpcUtils.getTask.invalidate()
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
