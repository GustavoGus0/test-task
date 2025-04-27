import { Helmet } from 'react-helmet-async'

import { icons } from '../../assets/icons'
import { ScaleUp } from '../../components/Animation'
import { Loader } from '../../components/Loader'
import { Segment } from '../../components/Segment'
import { useMe } from '../../lib/ctx'
import { trpc } from '../../lib/trpc'

import css from './index.module.scss'

export const Executors = () => {
  const me = useMe()
  if (!me) {
    return (
      <Segment type="error" title="Не авторизован">
        Для доступа к этой странице вам нужно авторизоваться
      </Segment>
    )
  }
  const { data, error, isLoading, isFetching } = trpc.getExecutors.useQuery()
  if (!data) {
    return (
      <Segment type="error" title="Ошибка">
        {error?.message || 'Произошла ошибка'}
      </Segment>
    )
  }
  return (
    <>
      <Helmet>
        <title>Подчинённые</title>
      </Helmet>
      <ScaleUp>
        <Segment title="Подчинённые">
          {(isLoading || isFetching) && <Loader />}
          {!data.length && <div>У вас нет подчинённых</div>}
          {!isFetching &&
            data.map((executor) => (
              <Executor executor={executor as IExecutor} key={executor.id}></Executor>
            ))}
        </Segment>
      </ScaleUp>
    </>
  )
}

interface IExecutor {
  id: string
  login: string
  firstName: string
  lastName: string
  patronymic: string
  role: 'MANAGER' | 'EXECUTOR'
}

const Executor = ({ executor }: { executor: IExecutor }) => {
  return (
    <div className={css.authorBox}>
      <div className={css.bgCircle}>{icons.profile()}</div>
      <div className={css.textBox}>
        <h4 className={css.authorFullName}>
          {executor.lastName} {executor.firstName} {executor.patronymic}
        </h4>
      </div>
    </div>
  )
}
