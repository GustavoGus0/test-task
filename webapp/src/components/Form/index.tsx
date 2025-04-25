import cn from 'classnames'
import { FormikProps } from 'formik'

import { icons } from '../../assets/icons'
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
  selectorType?: 'default' | 'managers'
  parameters: string[] | { login: string; id: string }[]
}

export const Form = ({
  cancelButton = false,
  alert,
  gap = 'large',
  formik,
  inputs,
  selectorInputs,
  legend,
  submitButtonText = 'Создать',
  clearButtonText = 'Очистить',
}: {
  cancelButton?: boolean
  alert?: string

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>
  gap?: 'small' | 'large'
  inputs: IInput[]
  selectorInputs?: ISelectorInput[]
  legend?: string
  submitButtonText?: string
  clearButtonText?: string
}) => {
  const filteredSelectorInputs =
    formik.values.role === 'MANAGER' || formik.values.role === null
      ? selectorInputs?.filter((input) => input.selectorType !== 'managers')
      : selectorInputs
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
        {!!legend && (
          <legend className={css.legend}>
            {legend}
            {cancelButton && (
              <button type="button" onClick={() => history.back()} className={css.icon}>
                {icons.cross()}
              </button>
            )}
          </legend>
        )}
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
        {filteredSelectorInputs &&
          filteredSelectorInputs.map((input) => {
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
          {clearButtonText}
        </button>
        {alert && <Alert type="error">{alert}</Alert>}
      </div>
    </form>
  )
}
