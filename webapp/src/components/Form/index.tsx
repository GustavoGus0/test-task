import { FormikProps } from 'formik'

import { Input, SelectorInput } from '../Input'

import css from './index.module.scss'

interface IInput {
  name: string
  label: string
  type?: 'textarea' | 'text' | 'password'
}

interface ISelectorInput extends IInput {
  needToTranslate?: boolean
  parameters: string[]
}

export const Form = ({
  formik,
  inputs,
  selectorInputs,
  legend,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>
  inputs: IInput[]
  selectorInputs?: ISelectorInput[]
  legend?: string
}) => {
  return (
    <form
      className={css.form}
      onSubmit={(e) => {
        e.preventDefault()
        void formik.handleSubmit()
      }}
    >
      <fieldset className={css.fieldset}>
        {!!legend && <legend className={css.legend}>{legend}</legend>}
        {inputs.map((input) => {
          return input.type === 'textarea' ? (
            <Input
              key={input.name}
              type="textarea"
              name={input.name}
              label={input.label}
              formik={formik}
            />
          ) : (
            <Input
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
                needToTranslate={input.needToTranslate}
                key={input.name}
              />
            )
          })}
      </fieldset>
      <div className={css.buttonBox}>
        <button className={css.button + ' ' + css.submitButton} type="submit">
          Создать
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
