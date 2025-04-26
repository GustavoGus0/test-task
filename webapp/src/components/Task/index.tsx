import { TaskPriority, TaskStatus } from '@management/backend/src/utils/types'
import cn from 'classnames'
import { Link } from 'react-router'

import { useMe } from '../../lib/ctx'
import { getViewTaskRoute } from '../../lib/routes'
import { getCyrillicPriority, getCyrillicStatus } from '../../utils/getCyrillic'

import css from './index.module.scss'

export interface ITask {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  createdById: string
  assignedToId: string
}

export const Task = ({
  id,
  title,
  description,
  status,
  priority,
  createdById,
  assignedToId,
}: ITask) => {
  const me = useMe()
  return (
    <Link to={getViewTaskRoute({ taskId: id })}>
      <li className={css.task}>
        <div className={css.titleBox}>
          <h3 className={css.title}>{title}</h3>
          <p className={css.description}>{description}</p>
        </div>
        <div className={css.info}>
          <div className={cn({ [css.status]: true, [css.bar]: true })}>
            {getCyrillicStatus(status)}
          </div>
          <div
            className={cn({
              [css.priority]: true,
              [css.bar]: true,
              [css.red]: priority === 'high',
              [css.yellow]: priority === 'medium',
              [css.green]: priority === 'low',
            })}
          >
            {getCyrillicPriority(priority)} приоритет
          </div>
          <div className={cn({ [css.assignedBy]: true, [css.bar]: true })}>
            {me?.role === 'EXECUTOR' && (
              <span>{createdById === me?.id ? 'Моя задача' : 'Назначена руководителем'}</span>
            )}
            {me?.role === 'MANAGER' && (
              <span>
                {createdById === me?.id && assignedToId !== me?.id
                  ? 'Назначена исполнителю'
                  : 'Моя задача'}
              </span>
            )}
          </div>
        </div>
      </li>
    </Link>
  )
}
