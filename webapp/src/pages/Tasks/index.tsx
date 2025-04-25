import {
  TaskPriority,
  TaskStatus,
  TaskFilter,
  DateFilter,
} from '@management/backend/src/utils/types'
import { useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import { Loader } from '../../components/Loader'
import { Segment } from '../../components/Segment'
import { Selector } from '../../components/Selector'
import { ITask, Task } from '../../components/Task'
import { useStorage } from '../../hooks/useStorage'
import { useMe } from '../../lib/ctx'
import { trpc } from '../../lib/trpc'
import {
  getCyrillicDataFilter,
  getCyrillicPriority,
  getCyrillicStatus,
  getCyrillicTasksFilter,
} from '../../utils/getCyrillic'

import css from './index.module.scss'

export interface IFilter {
  byTasks: TaskFilter
  byDate: DateFilter
  byPriority: TaskPriority
  byStatus: TaskStatus
}

export const Tasks = () => {
  const me = useMe()
  if (!me) {
    return (
      <Segment type="error" title="Не авторизован">
        Для доступа к этой странице вам нужно авторизоваться
      </Segment>
    )
  }
  const { getItem, setItem } = useStorage()
  useEffect(() => {
    setItem('filterByTasks', 'all' as TaskFilter)
    setItem('filterByDate', 'old' as DateFilter)
  }, [])
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
              values: ['old', 'new'],
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
              values: ['to-do', 'in-progress'],
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
