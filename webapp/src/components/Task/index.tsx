import { TaskPriority, TaskStatus } from '@management/backend/src/utils/types'
import cn from 'classnames'
import { Link } from 'react-router'

import { icons } from '../../assets/icons'
import { useMe } from '../../lib/ctx'
import { getViewTaskRoute } from '../../lib/routes'
import { getCyrillicStatus } from '../../utils/getCyrillic'

import css from './index.module.scss'

export interface ITask {
  completed?: boolean
  cancelled?: boolean
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  createdById: string
  assignedToId: string
}

export const Task = ({
  completed = false,
  cancelled = false,
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
          <div className={css.priorityAndTitle}>
            <div
              className={
                completed
                  ? cn({
                      [css.priority]: true,
                      [css.completed]: true,
                    })
                  : cancelled
                    ? cn({
                        [css.priority]: true,
                        [css.cancelled]: true,
                      })
                    : cn({
                        [css.priority]: true,
                        [css.high]: priority === 'high',
                        [css.medium]: priority === 'medium',
                        [css.low]: priority === 'low',
                      })
              }
            >
              {completed && icons.checkMark()}
              {cancelled && icons.cross()}
            </div>
            <h3 className={css.title}>{title}</h3>
          </div>
          <div className={css.statusAndAssignedBy}>
            <p className={css.status}>{getCyrillicStatus(status)}</p>
            <p className={css.status}>
              {me?.role === 'EXECUTOR' && (
                <span>{createdById === me?.id ? 'Моя задача' : 'Назначена руководителем'}</span>
              )}
              {me?.role === 'MANAGER' && (
                <span>
                  {createdById === me?.id && assignedToId === me?.id
                    ? 'Моя задача'
                    : 'Назначена исполнителю'}
                </span>
              )}
            </p>
          </div>
        </div>
        <p className={css.description}>{description}</p>
      </li>
    </Link>
  )
}
