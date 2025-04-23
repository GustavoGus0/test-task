import { Loader } from '../../components/Loader'
import { Segment } from '../../components/Segment'
import { ITask, Task } from '../../components/Task'
import { trpc } from '../../lib/trpc'

import css from './index.module.scss'

export const ArchivedTasks = () => {
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
            <Task {...(task as ITask)} key={task.id} />
          ))}
        </ul>
      )}
    </Segment>
  )
}
