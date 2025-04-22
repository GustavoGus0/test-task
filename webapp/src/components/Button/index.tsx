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

export const ChangeButton = ({ text }: { text: string }) => {
  return <button className={css.button}>{text}</button>
}
