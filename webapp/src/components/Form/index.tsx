import cn from 'classnames'
import { FormikProps } from 'formik'

import { Alert } from '../Alert'
import { Input, SelectorInput } from '../Input'

import css from './index.module.scss'

interface IInput {
  name: string
  label: string
  type?: 'textarea' | 'text' | 'password'
  errorMessage?: string
}

interface ISelectorInput extends IInput {
  translatorFunction?: (arg: string) => string
  parameters: string[]
}

export const Form = ({
  alert,
  gap = 'large',
  formik,
  inputs,
  selectorInputs,
  legend,
  submitButtonText = 'Создать',
}: {
  alert?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>
  gap?: 'small' | 'large'
  inputs: IInput[]
  selectorInputs?: ISelectorInput[]
  legend?: string
  submitButtonText?: string
}) => {
  return (
    <form
      className={css.form}
      onSubmit={(e) => {
        e.preventDefault()
        void formik.handleSubmit()
      }}
    >
      <fieldset
        className={cn({
          [css.fieldset]: true,
          [css.smallGap]: gap === 'small',
        })}
      >
        {!!legend && <legend className={css.legend}>{legend}</legend>}
        {inputs.map((input) => {
          return input.type === 'textarea' ? (
            <Input
              errorMessage={input.errorMessage}
              key={input.name}
              type="textarea"
              name={input.name}
              label={input.label}
              formik={formik}
            />
          ) : (
            <Input
              errorMessage={input.errorMessage}
              type={input.type}
              key={input.name}
              name={input.name}
              label={input.label}
              formik={formik}
            />
          )
        })}
        {selectorInputs &&
          selectorInputs.map((input) => {
            return (
              <SelectorInput
                parameters={input.parameters}
                name={input.name}
                label={input.label}
                formik={formik}
                translatorFunction={input.translatorFunction}
                key={input.name}
              />
            )
          })}
        {alert && <Alert type="error">{alert}</Alert>}
      </fieldset>
      <div className={css.buttonBox}>
        <button className={css.button + ' ' + css.submitButton} type="submit">
          {submitButtonText}
        </button>
        <button
          className={css.button + ' ' + css.clearButton}
          type="reset"
          onClick={() => formik.resetForm()}
        >
          Очистить
        </button>
      </div>
    </form>
  )
}
