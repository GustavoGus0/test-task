import { Loader } from '../../components/Loader'
import { Segment } from '../../components/Segment'
import { useMe } from '../../lib/ctx'
import { trpc } from '../../lib/trpc'

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
    <Segment title="Подчинённые">
      {(isLoading || isFetching) && <Loader />}
      {!data.length && <div>У вас нет подчинённых</div>}
      {data.map((executor) => (
        <div key={executor.id}>{executor.login}</div>
      ))}
    </Segment>
  )
}
