import {
  TaskPriority,
  TaskStatus,
  TaskFilter,
  DateFilter,
} from '@management/backend/src/utils/types'
import cn from 'classnames'
import { useState } from 'react'
import { Link } from 'react-router'
import { useDebounceValue } from 'usehooks-ts'

import { Loader } from '../../components/Loader'
import { Segment } from '../../components/Segment'
import { Selector } from '../../components/Selector'
import { getViewTaskRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import {
  getCyrillicDataFilter,
  getCyrillicPriority,
  getCyrillicStatus,
  getCyrillicTasksFilter,
} from '../../utils/getCyrillic'
import { useStorage } from '../../utils/useStorage'

import css from './index.module.scss'

export interface IFilter {
  byTasks: TaskFilter
  byDate: DateFilter
  byPriority: TaskPriority
  byStatus: TaskStatus
}

export const Tasks = () => {
  const { getItem } = useStorage()
  const [filters, setFilters] = useState<IFilter>({
    byTasks: getItem('filterByTasks') as TaskFilter,
    byDate: getItem('filterByDate') as DateFilter,
    byPriority: getItem('filterByPriority') as TaskPriority,
    byStatus: getItem('filterByStatus') as TaskStatus,
  })
  const [debouncedFilters] = useDebounceValue(filters, 500)
  const { data, error, isError, isLoading, isFetching } = trpc.getTasks.useQuery(debouncedFilters)
  return (
    <Segment
      setState={setFilters}
      title={'Задачи'}
      Filters={
        <Selector
          filters={filters}
          setFilters={setFilters}
          parameters={[
            {
              title: 'Задачи',
              values: ['all', 'my', 'executors'],
              byWhat: 'byTasks',
              translatorFunction: getCyrillicTasksFilter as (value: string) => string,
            },
            {
              title: 'По дате',
              values: ['new', 'old'],
              byWhat: 'byDate',
              translatorFunction: getCyrillicDataFilter as (value: string) => string,
            },
            {
              title: 'По приоритету',
              values: ['high', 'medium', 'low'],
              byWhat: 'byPriority',
              translatorFunction: getCyrillicPriority as (value: string) => string,
            },
            {
              title: 'По статусу',
              values: ['to-do', 'in-progress', 'completed', 'cancelled'],
              byWhat: 'byStatus',
              translatorFunction: getCyrillicStatus as (value: string) => string,
            },
          ]}
        />
      }
    >
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
