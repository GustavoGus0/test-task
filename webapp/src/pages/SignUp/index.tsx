import { zSignUpTrpcInput } from '@management/backend/src/router/signUp/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { Form } from '../../components/Form'
import { Segment } from '../../components/Segment'
import { getTasksRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

interface IInitialValues {
  login: string
  firstName: string
  lastName: string
  patronymic: string
  password: string
}

export const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>('')
  const signUp = trpc.signUp.useMutation()
  const trpcUtils = trpc.useUtils()
  const navigate = useNavigate()
  const initialValues: IInitialValues = {
    login: '',
    firstName: '',
    lastName: '',
    patronymic: '',
    password: '',
  }
  const formik = useFormik({
    initialValues,
    validate: withZodSchema(zSignUpTrpcInput),
    onSubmit: async (values) => {
      try {
        const { token } = await signUp.mutateAsync(values)
        Cookies.set('token', token, { expires: 99999 })
        void trpcUtils.invalidate()
        navigate(getTasksRoute())
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setErrorMessage(error.message)
      }
    },
  })
  return (
    <Segment title="Регистрация">
      <Form
        gap="small"
        formik={formik}
        legend="Создайте аккаунт"
        inputs={[
          { name: 'login', label: 'Логин', errorMessage: errorMessage },
          { name: 'password', label: 'Пароль', type: 'password' },
          { name: 'firstName', label: 'Имя' },
          { name: 'lastName', label: 'Фамилия' },
          { name: 'patronymic', label: 'Отчество' },
        ]}
      />
    </Segment>
  )
}
