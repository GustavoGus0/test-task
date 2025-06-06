import { TrpcRouterOutput } from '@management/backend/src/router'
import { TaskPriority, TaskStatus } from '@management/backend/src/utils/types'
import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useParams } from 'react-router'

import { icons } from '../../assets/icons'
import { CancelButton, ChangeButton, DeleteButton, EditButton } from '../../components/Button'
import { Segment } from '../../components/Segment'
import { useMe, useWindowWidth } from '../../lib/ctx'
import { ViewTaskRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import { checkMyOrManagersTask, checkMyTask, checkStatus } from '../../utils/check'
import { getCyrillicPriority, getCyrillicStatus } from '../../utils/getCyrillic'

import css from './index.module.scss'

export const ViewTask = () => {
  const me = useMe()
  if (!me) {
    return (
      <Segment type="error" title="Не авторизован">
        Для доступа к этой странице вам нужно авторизоваться
      </Segment>
    )
  }
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
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.1 }}
    >
      <Segment status={data.task.status as TaskStatus} getBack={true} title={'Просмотр задачи'}>
        <AnimatePresence mode="wait">
          <motion.div transition={{ duration: 0.1 }}>
            <Task task={data.task} />
          </motion.div>
        </AnimatePresence>
      </Segment>
    </motion.div>
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

  return `${formattedDate} в ${formattedTime}`
}

const Task = ({ task }: { task: TrpcRouterOutput['getTask']['task'] }) => {
  const me = useMe()
  const isProcessed = task.status === 'to-do' || task.status === 'in-progress'
  const windowWidth = useWindowWidth()

  return (
    <motion.div exit={{ opacity: 0 }} className={css.taskWrapper}>
      <div className={css.statusPriorityAndTime}>
        <div className={css.statusAndPriority}>
          <p
            className={cn({
              [css.bar]: true,
              [css.fullRounded]: windowWidth < 1481,
              [css.low]: task.priority === 'low',
              [css.medium]: task.priority === 'medium',
              [css.high]: task.priority === 'high',
            })}
          >
            {getCyrillicPriority(task.priority as TaskPriority)} приоритет
          </p>
          <p
            className={cn({
              [css.bar]: true,
              [css.fullRounded]: windowWidth < 1481,
              [css.status]: true,
              [css.completed]: task.status === 'completed',
            })}
          >
            {getCyrillicStatus(task.status as TaskStatus)}{' '}
            {task.status === 'completed' && formatTimestamp(task.completedAt as Date)}
          </p>
          <p
            className={cn({
              [css.bar]: true,
              [css.fullRounded]: windowWidth < 1481,
              [css.assignedBy]: true,
            })}
          >
            {me?.role === 'EXECUTOR' && (
              <span>{task.createdById === me?.id ? 'Моя задача' : 'Назначена руководителем'}</span>
            )}
            {me?.role === 'MANAGER' && (
              <span>
                {task.createdById === me?.id && task.assignedToId !== me?.id
                  ? 'Назначена исполнителю'
                  : 'Моя задача'}
              </span>
            )}
          </p>
        </div>
        <p className={css.createdAt}>
          {windowWidth < 591
            ? `Создана ${formatTimestamp(task.createdAt)}`
            : formatTimestamp(task.createdAt)}
        </p>
      </div>
      <div className={css.task}>
        <h2 className={css.title}>{task.title}</h2>
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
              {task.createdById === me?.id
                ? 'Вы'
                : `${task.createdBy.lastName} ${task.createdBy.firstName} ${task.createdBy.patronymic}`}
            </h4>
            <p className={css.role}>Постановщик задачи</p>
          </div>
        </div>
      </div>

      <div className={css.buttonBox}>
        {isProcessed && <ChangeButton taskId={task.id} text={task.status} />}
        {checkMyTask(me, task) && !checkStatus(task, ['cancelled', 'completed']) && (
          <EditButton taskId={task.id} />
        )}
        {checkMyOrManagersTask(me, task) && !checkStatus(task, ['completed', 'cancelled']) && (
          <CancelButton taskId={task.id} />
        )}
        {checkMyTask(me, task) && (
          <DeleteButton taskStatus={task.status as TaskStatus} taskId={task.id} />
        )}
      </div>
    </motion.div>
  )
}
