import { TaskPriority, TaskStatus } from '@management/backend/src/utils/types'
import cn from 'classnames'

import { Loader } from '../../components/Loader'
import { Segment } from '../../components/Segment'
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

const Task = ({ title, description, status, priority }: ITask) => {
  return (
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
  )
}
