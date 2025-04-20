import { TaskPriority } from '@management/backend/src/prisma/types.prisma'
import cn from 'classnames'
import { FormikProps } from 'formik'

import { getCyrillicPriority } from '../../utils/getCyrillic'

import css from './index.module.scss'

export const Input = ({
  type = 'text',
  name,
  label,
  formik,
}: {
  type?: 'text' | 'textarea' | 'password'
  name: string
  label: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>
}) => {
  if (type !== 'textarea') {
    return (
      <div className={css.inputBox}>
        <label className={css.label} htmlFor={name}>
          {label}
        </label>
        <input
          className={css.input}
          onChange={(e) => {
            void formik.setFieldValue(name, e.target.value)
          }}
          type={type}
          id={name}
          name={name}
        />
      </div>
    )
  } else {
    return (
      <div className={css.inputBox}>
        <label className={css.label} htmlFor={name}>
          {label}
        </label>
        <textarea
          className={css.textarea}
          onChange={(e) => {
            void formik.setFieldValue(name, e.target.value)
          }}
          id={name}
          name={name}
        />
      </div>
    )
  }
}

export const SelectorInput = ({
  parameters,
  name,
  label,
  formik,
}: {
  parameters: string[]
  name: string
  label: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>
}) => {
  return (
    <div className={css.inputBox}>
      <label className={css.label} htmlFor={name}>
        {label}
      </label>
      <div className={css.priorities}>
        {parameters.map((parameter) => (
          <button
            key={parameter}
            onClick={() => {
              void formik.setFieldValue(name, parameter)
            }}
            className={cn({
              [css.priority]: true,
              [css.active]: (formik.values.priority as string) === parameter,
            })}
            type="button"
          >
            {getCyrillicPriority(parameter as TaskPriority)}
          </button>
        ))}
      </div>
    </div>
  )
}
