import { useState } from 'react'

import { Loader } from '../../components/Loader'
import { Segment } from '../../components/Segment'
import { NoButtonSelector } from '../../components/Selector'
import { ITask, Task } from '../../components/Task'
import { useStorage } from '../../hooks/useStorage'
import { useMe } from '../../lib/ctx'
import { trpc } from '../../lib/trpc'
import { getCyrillicStatus } from '../../utils/getCyrillic'

import css from './index.module.scss'

export const ArchivedTasks = () => {
  const me = useMe()
  if (!me) {
    return (
      <Segment type="error" title="Не авторизован">
        Для доступа к этой странице вам нужно авторизоваться
      </Segment>
    )
  }
  const { getItem } = useStorage()
  const [filterArchive, setFilterArchive] = useState<'completed' | 'cancelled'>(
    getItem('filterArchive') as 'completed' | 'cancelled'
  )
  const { data, error, isError, isLoading, isFetching } = trpc.getTasks.useQuery({
    byTime: null,
    byTasks: 'all',
    byDate: null,
    byPriority: null,
    byStatus: filterArchive,
  })

  if (!data || isError) {
    return (
      <Segment type="error" title="Ошибка">
        {isError && error.message}
      </Segment>
    )
  }
  return (
    <Segment
      title="Архив"
      NoButtonSelector={
        <NoButtonSelector
          filterArchive={filterArchive}
          setFilterArchive={setFilterArchive}
          buttons={[{ value: 'completed' }, { value: 'cancelled' }]}
          translatorFunction={getCyrillicStatus as (arg: string) => string}
        />
      }
    >
      {(isLoading || isFetching) && <Loader />}
      {!isFetching && (!data || !data.tasks.length) && <div>Задач нет</div>}
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
