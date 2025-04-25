import { zNewTaskTrpcInput } from '@management/backend/src/router/newTask/input'
import { TaskPriority, TaskStatus } from '@management/backend/src/utils/types'
import cn from 'classnames'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { Dispatch, SetStateAction, useState } from 'react'

import { icons } from '../../assets/icons'
import { Form } from '../../components/Form'
import { Loader } from '../../components/Loader'
import { Segment } from '../../components/Segment'
import { useAlerts, useMe } from '../../lib/ctx'
import { trpc } from '../../lib/trpc'
import { getCyrillicPriority } from '../../utils/getCyrillic'

import css from './index.module.scss'

export interface IInitialValues {
  title: string
  description: string
  priority: TaskPriority | null
  status: TaskStatus
  assignedToId: string | null
}

export const NewTask = () => {
  const me = useMe()
  const setAlerts = useAlerts()
  if (!me) {
    return (
      <Segment type="error" title="Не авторизован">
        Для доступа к этой странице вам нужно авторизоваться
      </Segment>
    )
  }
  const [formKey, setFormKey] = useState(0)
  const defaultPriority: IInitialValues['priority'] = null
  const defaultStatus: TaskStatus = 'to-do'
  const createTask = trpc.newTask.useMutation()
  const [taskExecutorId, setTaskExecutorId] = useState<string | null>(null)

  const initialValues: IInitialValues = {
    title: '',
    description: '',
    priority: defaultPriority,
    status: defaultStatus,
    assignedToId: taskExecutorId,
  }

  const formik = useFormik({
    initialValues,
    validate: withZodSchema(zNewTaskTrpcInput),
    onSubmit: async (values) => {
      await createTask.mutateAsync(values)
      formik.resetForm()
      setFormKey((prev) => prev + 1)
      setAlerts((prev) => [
        { title: 'Задача создана', type: 'success', createdAt: new Date() },
        ...prev,
      ])
    },
  })
  return (
    <Segment title={'Новая задача'}>
      <div className={css.formWrapper}>
        <Form
          key={formKey}
          formik={formik}
          legend={'Создайте новую задачу'}
          inputs={[
            {
              name: 'title',
              label: 'Заголовок',
            },
            { name: 'description', label: 'Описание', type: 'textarea' },
          ]}
          selectorInputs={[
            {
              translatorFunction: getCyrillicPriority as (priority: string) => string,
              name: 'priority',
              label: 'Приоритет',
              parameters: ['low', 'medium', 'high'],
            },
          ]}
        />
        {me.role === 'MANAGER' && (
          <ExecutorsSelector<string | null>
            taskExecutorId={taskExecutorId}
            setTaskExecutorId={setTaskExecutorId}
          />
        )}
      </div>
    </Segment>
  )
}

const ExecutorsSelector = <T,>({
  taskExecutorId,
  setTaskExecutorId,
}: {
  taskExecutorId: T
  setTaskExecutorId: Dispatch<SetStateAction<T>>
}) => {
  const [showExecutors, setShowExecutors] = useState<boolean>(false)
  const { data, error, isLoading, isFetching } = trpc.getExecutors.useQuery()

  const handleSetExecutor = (parameter: T) => {
    if (taskExecutorId === parameter) {
      return setTaskExecutorId(null as T)
    }
    setTaskExecutorId(parameter)
  }
  if (isLoading || isFetching) {
    return <Loader />
  }
  if (!data || error || data?.length === 0) {
    return null
  }

  return (
    <div className={css.executorsSelector}>
      <button onClick={() => setShowExecutors((prev) => !prev)} className={css.selectorButton}>
        <div className={css.icon}>{icons.newTask()}</div>
        <span>Назначить на подчинённого</span>
      </button>
      <ul className={css.executorsList}>
        {showExecutors &&
          data.map((executor) => (
            <li key={executor.id} className={css.executorItem}>
              <button
                onClick={() => handleSetExecutor(executor.id as T)}
                className={cn({
                  [css.executorButton]: true,
                  [css.active]: taskExecutorId === executor.id,
                })}
              >
                {executor.lastName} {executor.firstName} {executor.patronymic}
              </button>
            </li>
          ))}
      </ul>
    </div>
  )
}
