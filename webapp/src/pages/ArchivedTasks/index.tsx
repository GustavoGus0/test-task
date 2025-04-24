import { Loader } from '../../components/Loader'
import { Segment } from '../../components/Segment'
import { ITask, Task } from '../../components/Task'
import { useMe } from '../../lib/ctx'
import { trpc } from '../../lib/trpc'

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
  const { data, error, isError, isLoading, isFetching } = trpc.getTasks.useQuery({
    byTasks: null,
    byDate: null,
    byPriority: null,
    byStatus: 'completed',
  })
  return (
    <Segment title="Архив">
      {(isLoading || isFetching) && <Loader />}
      {isError && <div>{error.message}</div>}
      {(!data || !data.tasks.length) && <div>Задач нет</div>}
      {data && (
        <ul className={css.tasksList}>
          {data.tasks.map((task) => (
            <Task completed={true} {...(task as ITask)} key={task.id} />
          ))}
        </ul>
      )}
    </Segment>
  )
}
