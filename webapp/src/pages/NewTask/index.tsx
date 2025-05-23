import { zNewTaskTrpcInput } from '@management/backend/src/router/newTask/input'
import { TaskPriority, TaskStatus } from '@management/backend/src/utils/types'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { ScaleUp } from '../../components/Animation'
import { Form } from '../../components/Form'
import { Segment } from '../../components/Segment'
import { ExecutorsSelector } from '../../components/Selector'
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

  const initialValues: IInitialValues = {
    title: '',
    description: '',
    priority: defaultPriority,
    status: defaultStatus,
    assignedToId: null,
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
    <>
      <Helmet>
        <title>Новая задача</title>
      </Helmet>
      <ScaleUp>
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
            {me.role === 'MANAGER' && <ExecutorsSelector formik={formik} />}
          </div>
        </Segment>
      </ScaleUp>
    </>
  )
}
