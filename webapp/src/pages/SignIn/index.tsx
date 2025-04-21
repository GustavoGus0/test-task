import { zSignInTrpcInput } from '@management/backend/src/router/signIn/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router'

import { Form } from '../../components/Form'
import { Segment } from '../../components/Segment'
import { getTasksRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

interface IInitialValues {
  login: string
  password: string
}

export const SignIn = () => {
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
      const { token } = await signIn.mutateAsync(values)
      Cookies.set('token', token, { expires: 99999 })
      void trpcUtils.invalidate()
      navigate(getTasksRoute())
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
      />
    </Segment>
  )
}
