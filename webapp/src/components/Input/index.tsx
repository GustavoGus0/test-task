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
        <Alert type="error">
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
  parameters: string[] | { login: string; id: string }[]
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
        {parameters && parameters.length > 0 ? (
          parameters.map((parameter) => (
            <button
              key={typeof parameter === 'string' ? parameter : parameter.login}
              onClick={() => {
                return typeof parameter === 'string'
                  ? formik.setFieldValue(name, parameter)
                  : formik.setFieldValue(name, parameter.id)
              }}
              className={cn({
                [css.priority]: true,
                [css.active]:
                  typeof parameter === 'string'
                    ? (formik.values[name] as string) === parameter
                    : (formik.values[name] as string) === parameter.id,
                [css.invalid]: isTouched && errorMessage,
              })}
              type="button"
            >
              {translatorFunction
                ? typeof parameter === 'string'
                  ? translatorFunction(parameter)
                  : translatorFunction(parameter.login)
                : typeof parameter === 'string'
                  ? parameter
                  : parameter.login}
            </button>
          ))
        ) : (
          <p className={css.noData}>Нет данных о руководителях</p>
        )}
      </div>
      <Alert type="error">{isTouched && (errorMessage as string)}</Alert>
    </div>
  )
}
