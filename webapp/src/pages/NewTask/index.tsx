import { zNewTaskTrpcInput } from '@management/backend/src/router/newTask/input'
import { TaskPriority, TaskStatus } from '@management/backend/src/utils/types'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { useState } from 'react'

import { Form } from '../../components/Form'
import { Segment } from '../../components/Segment'
import { useMe } from '../../lib/ctx'
import { trpc } from '../../lib/trpc'
import { getCyrillicPriority } from '../../utils/getCyrillic'

export interface IInitialValues {
  title: string
  description: string
  priority: TaskPriority | null
  status: TaskStatus
}

export const NewTask = () => {
  const me = useMe()
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
  }

  const formik = useFormik({
    initialValues,
    validate: withZodSchema(zNewTaskTrpcInput),
    onSubmit: async (values) => {
      await createTask.mutateAsync(values)
      formik.resetForm()
      setFormKey((prev) => prev + 1)
    },
  })
  return (
    <Segment title={'Новая задача'}>
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
          { name: 'deadline', label: 'Время начала', type: 'time' },
          { name: 'deadline', label: 'Время завершения', type: 'time' },
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
    </Segment>
  )
}
