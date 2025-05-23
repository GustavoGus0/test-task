import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { Loader } from '../../components/Loader'
import { getSignInRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

export const SignOut = () => {
  const navigate = useNavigate()
  const trpcUtils = trpc.useUtils()

  useEffect(() => {
    Cookies.remove('token')
    void trpcUtils.invalidate().then(() => {
      navigate(getSignInRoute())
    })
  }, [])

  return <Loader />
}
