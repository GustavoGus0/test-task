import cn from 'classnames'
import { FormikProps } from 'formik'

import { Alert } from '../Alert'

import css from './index.module.scss'

export const Input = ({
  type = 'text',
  name,
  label,
  formik,
  errorMessage,
}: {
  type?: 'text' | 'textarea' | 'password'
  name: string
  label: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>
  errorMessage?: string
}) => {
  const validationMessage = formik.errors[name]
  const isTouched = formik.touched[name]
  if (type === 'text' || type === 'password') {
    return (
      <div className={css.inputBox}>
        <label className={css.label} htmlFor={name}>
          {label}
        </label>
        <input
          className={cn({
            [css.input]: true,
            [css.invalid]: isTouched && (validationMessage || errorMessage),
          })}
          onChange={(e) => {
            void formik.setFieldValue(name, e.target.value)
          }}
          type={type}
          id={name}
          name={name}
        />
        <Alert type="error" forWhat="input">
          {isTouched && (validationMessage as string)}
          {errorMessage && (errorMessage as string)}
        </Alert>
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
  translatorFunction,
  name,
  label,
  formik,
}: {
  parameters: string[]
  translatorFunction?: (arg: string) => string
  name: string
  label: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>
}) => {
  const errorMessage = formik.errors[name]
  const isTouched = formik.touched[name]
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
              [css.active]: (formik.values[name] as string) === parameter,
              [css.invalid]: isTouched && errorMessage,
            })}
            type="button"
          >
            {translatorFunction ? translatorFunction(parameter) : parameter}
          </button>
        ))}
      </div>
      <Alert type="error" forWhat="input">
        {isTouched && (errorMessage as string)}
      </Alert>
    </div>
  )
}
