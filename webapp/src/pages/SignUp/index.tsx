import { zSignUpTrpcInput } from '@management/backend/src/router/signUp/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router'

import { ScaleUp } from '../../components/Animation'
import { Form } from '../../components/Form'
import { Segment } from '../../components/Segment'
import { useMe } from '../../lib/ctx'
import { getTasksRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import { getCyrillicRole } from '../../utils/getCyrillic'

interface IInitialValues {
  login: string
  firstName: string
  lastName: string
  patronymic: string
  password: string
  role: 'MANAGER' | 'EXECUTOR' | null
  managerId: string | undefined
}

export const SignUp = () => {
  const me = useMe()
  if (me) {
    return <Segment title="Регистрация">Вы уже авторизованы</Segment>
  }
  const { data, error } = trpc.getManagers.useQuery({})
  const availableManagers = data?.managers?.map((manager) => ({
    login: manager.login,
    id: manager.id,
  }))
  const [errorMessage, setErrorMessage] = useState<string | undefined>('')
  if (error) {
    setErrorMessage(error.message)
  }
  const signUp = trpc.signUp.useMutation()
  const trpcUtils = trpc.useUtils()
  const navigate = useNavigate()
  const initialValues: IInitialValues = {
    login: '',
    firstName: '',
    lastName: '',
    patronymic: '',
    password: '',
    role: null,
    managerId: undefined,
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
    <>
      <Helmet>
        <title>Регистрация</title>
      </Helmet>
      <ScaleUp>
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
            selectorInputs={[
              {
                translatorFunction: getCyrillicRole as (role: string) => string,
                name: 'role',
                label: 'Роль',
                parameters: ['MANAGER', 'EXECUTOR'],
              },
              {
                name: 'managerId',
                label: 'Руководитель',
                parameters: availableManagers ? availableManagers : [],
                selectorType: 'managers',
              },
            ]}
          />
        </Segment>
      </ScaleUp>
    </>
  )
}
