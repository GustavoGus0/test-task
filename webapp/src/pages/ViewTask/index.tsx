import { TrpcRouterOutput } from '@management/backend/src/router'
import { TaskPriority, TaskStatus } from '@management/backend/src/utils/types'
import cn from 'classnames'
import { useParams } from 'react-router'

import { icons } from '../../assets/icons'
import { CancelButton, ChangeButton, DeleteButton, EditButton } from '../../components/Button'
import { Segment } from '../../components/Segment'
import { useMe } from '../../lib/ctx'
import { ViewTaskRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import { checkMyIdea, checkStatus } from '../../utils/check'
import { getCyrillicPriority, getCyrillicStatus } from '../../utils/getCyrillic'

import css from './index.module.scss'

export const ViewTask = () => {
  const { taskId } = useParams() as ViewTaskRouteParams
  const { data, error } = trpc.getTask.useQuery({
    taskId,
  })

  if (error || !data) {
    return (
      <div>
        Error({data && `: ${error.message}`}
        {error?.message})
      </div>
    )
  }

  return (
    <Segment getBack={true} title={'Просмотр задачи'}>
      <Task task={data.task} />
    </Segment>
  )
}

function formatTimestamp(timestamp: Date) {
  const date = new Date(timestamp)

  const dateFormatter = new Intl.DateTimeFormat('ru', {
    day: 'numeric',
    month: 'long',
  })

  const timeFormatter = new Intl.DateTimeFormat('ru', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  })

  const formattedDate = dateFormatter.format(date)
  const formattedTime = timeFormatter.format(date)

  return `${formattedDate}, ${formattedTime}`
}

const Task = ({ task }: { task: TrpcRouterOutput['getTask']['task'] }) => {
  const me = useMe()
  const isProcessed = task.status === 'to-do' || task.status === 'in-progress'
  return (
    <div className={css.taskWrapper}>
      <div className={css.statusAndPriority}>
        <p
          className={cn({
            [css.bar]: true,
            [css.low]: task.priority === 'low',
            [css.medium]: task.priority === 'medium',
            [css.high]: task.priority === 'high',
          })}
        >
          {getCyrillicPriority(task.priority as TaskPriority)} приориет
        </p>
        <p className={cn({ [css.bar]: true, [css.status]: true })}>
          {getCyrillicStatus(task.status as TaskStatus)}
        </p>
      </div>
      <div className={css.task}>
        <div className={css.titleBox}>
          <h2 className={css.title}>{task.title}</h2>
          <p>{formatTimestamp(task.createdAt)}</p>
        </div>
        <div className={css.descriptionBox}>
          {task.description === '' ? (
            'Нет описания'
          ) : (
            <p className={css.description}>{task.description}</p>
          )}
        </div>
        <div className={css.authorBox}>
          <div className={css.bgCircle}>{icons.profile()}</div>
          <div className={css.textBox}>
            <h4 className={css.authorFullName}>
              {task.authorId === me?.id
                ? 'Вы'
                : `${task.author.lastName} ${task.author.firstName} ${task.author.patronymic}`}
            </h4>
            <p className={css.role}>Постановщик задачи</p>
          </div>
        </div>
      </div>
      <div className={css.buttonBox}>
        {isProcessed && <ChangeButton taskId={task.id} text={task.status} />}
        {checkMyIdea(me, task) && !checkStatus(task, ['cancelled', 'completed']) && <EditButton />}
        {checkMyIdea(me, task) && !checkStatus(task, ['completed', 'cancelled']) && (
          <CancelButton taskId={task.id} />
        )}
        {me && me.id === task.authorId && <DeleteButton taskId={task.id} />}
      </div>
    </div>
  )
}
