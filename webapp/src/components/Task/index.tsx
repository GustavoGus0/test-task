import { TaskPriority, TaskStatus } from '@management/backend/src/utils/types'
import cn from 'classnames'
import { Link } from 'react-router'

import { getViewTaskRoute } from '../../lib/routes'
import { getCyrillicStatus } from '../../utils/getCyrillic'

import css from './index.module.scss'

export interface ITask {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
}

export const Task = ({ id, title, description, status, priority }: ITask) => {
  return (
    <Link to={getViewTaskRoute({ taskId: id })}>
      <li className={css.task}>
        <div className={css.titleBox}>
          <div className={css.priorityAndTitle}>
            <div
              className={cn({
                [css.priority]: true,
                [css.high]: priority === 'high',
                [css.medium]: priority === 'medium',
                [css.low]: priority === 'low',
              })}
            />
            <h3 className={css.title}>{title}</h3>
          </div>
          <p className={css.status}>{getCyrillicStatus(status)}</p>
        </div>
        <p className={css.description}>{description}</p>
      </li>
    </Link>
  )
}
