import { TaskPriority, TaskStatus } from '@management/backend/src/prisma/types.prisma'
import { zNewTaskTrpcInput } from '@management/backend/src/router/newTask/input'
import cn from 'classnames'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'

import { Segment } from '../../components/Segment'
import { trpc } from '../../lib/trpc'

import css from './index.module.scss'

export const NewTask = () => {
  const defaultPriority: TaskPriority = 'low'
  const defaultStatus: TaskStatus = 'to-do'
  const createTask = trpc.newTask.useMutation()

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      priority: defaultPriority,
      status: defaultStatus,
    },
    validate: withZodSchema(zNewTaskTrpcInput),
    onSubmit: async (values) => {
      await createTask.mutateAsync(values)
      formik.resetForm()
    },
  })
  return (
    <Segment title={'Новая задача'}>
      <form className={css.form} onSubmit={formik.handleSubmit}>
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Создайте новую задачу</legend>
          <div className={css.inputBox}>
            <label className={css.label} htmlFor="title">
              Заголовок
            </label>
            <input
              className={css.input}
              onChange={(e) => {
                void formik.setFieldValue('title', e.target.value)
              }}
              type="text"
              id="title"
              name="title"
            />
          </div>
          <div className={css.inputBox}>
            <label className={css.label} htmlFor="description">
              Описание
            </label>
            <textarea
              className={css.textarea}
              onChange={(e) => {
                void formik.setFieldValue('description', e.target.value)
              }}
              name="description"
              id="description"
            />
          </div>
          <div className={css.inputBox}>
            <label className={css.label} htmlFor="priority">
              Приоритет
            </label>
            <div className={css.priorities}>
              <button
                onClick={() => {
                  void formik.setFieldValue('priority', 'low')
                }}
                className={cn({
                  [css.priority]: true,
                  [css.active]: (formik.values.priority as string) === 'low',
                })}
              >
                Низкий
              </button>
              <button
                onClick={() => {
                  void formik.setFieldValue('priority', 'medium')
                }}
                className={cn({
                  [css.priority]: true,
                  [css.active]: (formik.values.priority as string) === 'medium',
                })}
              >
                Средний
              </button>
              <button
                onClick={() => {
                  void formik.setFieldValue('priority', 'high')
                }}
                className={cn({
                  [css.priority]: true,
                  [css.active]: (formik.values.priority as string) === 'high',
                })}
              >
                Высокий
              </button>
            </div>
          </div>
        </fieldset>
        <div className={css.buttonBox}>
          <button className={css.button + ' ' + css.submitButton} type="submit">
            Создать
          </button>
          <button className={css.button + ' ' + css.clearButton} type="reset">
            Очистить
          </button>
        </div>
      </form>
    </Segment>
  )
}
