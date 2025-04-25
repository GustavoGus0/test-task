import { zEditTaskTrpcInput } from '@management/backend/src/router/editTask/input'
import { TaskPriority, TaskStatus } from '@management/backend/src/utils/types'
import cn from 'classnames'
import { FormikProps, useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { icons } from '../../assets/icons'
import { Form } from '../../components/Form'
import { Loader } from '../../components/Loader'
import { Segment } from '../../components/Segment'
import { useAlerts, useMe } from '../../lib/ctx'
import { getViewTaskRoute, ViewTaskRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import { getCyrillicPriority } from '../../utils/getCyrillic'

import css from '../NewTask/index.module.scss'

export interface IInitialValues {
  title: string
  description: string
  priority: TaskPriority | null
  status: TaskStatus
  assignedToId: string | null
}

export const EditTask = () => {
  const me = useMe()
  const setAlerts = useAlerts()
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
  if (!data) {
    return (
      <Segment type="error" title="Ошибка">
        {error?.message || 'Произошла ошибка'}
      </Segment>
    )
  }
  const navigate = useNavigate()
  const [formKey, setFormKey] = useState(0)
  const [alert, setAlert] = useState('')
  const defaultPriority: IInitialValues['priority'] = data.task.priority as TaskPriority
  const defaultStatus: TaskStatus = data.task.status as TaskStatus
  const editTask = trpc.editTask.useMutation()

  const initialValues: IInitialValues = {
    title: data.task.title,
    description: data.task.description,
    priority: defaultPriority,
    status: defaultStatus,
    assignedToId: data.task.assignedToId,
  }

  const formik = useFormik({
    initialValues,
    validate: withZodSchema(zEditTaskTrpcInput.omit({ taskId: true })),
    onSubmit: async (values) => {
      if (
        initialValues.title === formik.values.title &&
        initialValues.description === formik.values.description &&
        initialValues.priority === formik.values.priority &&
        initialValues.status === formik.values.status &&
        initialValues.assignedToId === formik.values.assignedToId
      ) {
        setAlert('Внесите изменения')
        return
      }
      await editTask.mutateAsync({ ...values, taskId: data.task.id })
      navigate(getViewTaskRoute({ taskId: data.task.id }), { replace: true })
      setFormKey((prev) => prev + 1)
      setAlerts((prev) => [
        { title: 'Задача отредактирована', type: 'success', createdAt: new Date() },
        ...prev,
      ])
    },
  })
  return (
    <Segment title={'Редактирование задачи'}>
      <div className={css.formWrapper}>
        <Form
          alert={alert}
          submitButtonText="Сохранить"
          clearButtonText="Сбросить"
          cancelButton={true}
          key={formKey}
          formik={formik}
          legend={'Измените существующую задачу'}
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
        {me.role === 'MANAGER' && <ExecutorsSelector formik={formik} />}
      </div>
    </Segment>
  )
}

const ExecutorsSelector = ({
  formik,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>
}) => {
  const [showExecutors, setShowExecutors] = useState<boolean>(false)
  const { data, error, isLoading, isFetching } = trpc.getExecutors.useQuery()
  const [assignedToIdState, setAssignedToIdState] = useState<string | null>(null)

  const handleSetExecutor = (parameter: string) => {
    if (assignedToIdState === parameter) {
      setAssignedToIdState(null)
      formik.setFieldValue('assignedToId', null)
    }
    formik.setFieldValue('assignedToId', parameter)
    return setAssignedToIdState(parameter)
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
                onClick={() => handleSetExecutor(executor.id)}
                className={cn({
                  [css.executorButton]: true,
                  [css.active]: formik.values.assignedToId === executor.id,
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
