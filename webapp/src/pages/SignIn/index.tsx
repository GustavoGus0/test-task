import { zSignInTrpcInput } from '@management/backend/src/router/signIn/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { Form } from '../../components/Form'
import { Segment } from '../../components/Segment'
import { useMe } from '../../lib/ctx'
import { getTasksRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

interface IInitialValues {
  login: string
  password: string
}

export const SignIn = () => {
  const me = useMe()
  if (me) {
    return <Segment title="Вход">Вы уже авторизованы</Segment>
  }
  const [errorMessage, setErrorMessage] = useState<string | undefined>('')
  const signIn = trpc.signIn.useMutation()
  const trpcUtils = trpc.useUtils()
  const navigate = useNavigate()
  const initialValues: IInitialValues = {
    login: '',
    password: '',
  }
  const formik = useFormik({
    initialValues,
    validate: withZodSchema(zSignInTrpcInput),
    onSubmit: async (values) => {
      try {
        const { token } = await signIn.mutateAsync(values)
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
        submitButtonText="Войти"
        formik={formik}
        inputs={[
          { name: 'login', label: 'Логин' },
          { name: 'password', label: 'Пароль', type: 'password' },
        ]}
        alert={errorMessage}
      />
    </Segment>
  )
}
