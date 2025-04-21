import { TaskPriority, TaskStatus } from '@management/backend/src/utils/types'
import cn from 'classnames'
import { Link } from 'react-router'

import { Loader } from '../../components/Loader'
import { Segment } from '../../components/Segment'
import { getViewTaskRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import { getCyrillicStatus } from '../../utils/getCyrillic'

import css from './index.module.scss'

export const Tasks = () => {
  const { data, error, isError, isLoading, isFetching } = trpc.getTasks.useQuery()
  return (
    <Segment title={'Задачи'}>
      {(isLoading || isFetching) && <Loader />}
      {isError && <div>{error.message}</div>}
      {(!data || !data.tasks.length) && <div>Задач нет</div>}
      {data && (
        <ul className={css.tasksList}>
          {data.tasks.map((task) => (
            <Task {...(task as ITask)} key={task.id} />
          ))}
        </ul>
      )}
    </Segment>
  )
}

interface ITask {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
}

const Task = ({ id, title, description, status, priority }: ITask) => {
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
