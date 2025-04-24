import { TrpcRouterOutput } from '@management/backend/src/router'
import { Link, Outlet } from 'react-router'

import { useMe } from '../../lib/ctx'
import { links } from '../../lib/links'
import { type ILink } from '../../lib/links'
import { trpc } from '../../lib/trpc'

import css from './index.module.scss'

export const Layout = () => {
  const me = useMe()
  const { data } = trpc.getManagers.useQuery({ myManager: true })
  return (
    <div className={css.container}>
      <header className={css.header}>
        <h1 className={css.headerText}>TODO</h1>
        {me && <p>Зарегистрирован как {me?.login}</p>}
        {me && me.role === 'EXECUTOR' && data?.manager !== undefined && (
          <p>Руководитель: {data?.manager?.login}</p>
        )}
        <nav className={css.navigation}>
          <ul className={css.list}>
            {defineLinksFilter(links, me).map((link) => (
              <li className={css.item} key={link.to}>
                <Link className={css.reactLink} to={link.to}>
                  <div className={css.linkWrapper}>
                    <div className={css.icon}>{link.icon}</div>
                    <span className={css.label}>{link.label}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className={css.content}>
        <Outlet />
      </main>
    </div>
  )
}
const defineLinksFilter = (links: ILink[], me: TrpcRouterOutput['getMe']['me']) => {
  if (me) {
    if (me.role === 'EXECUTOR') {
      return links.filter((link) => link.forAuth === true && link.forExecutor === true)
    }
    return links.filter((link) => link.forAuth === true)
  } else {
    return links.filter((link) => link.forAuth === false || link.canSeeNotAuth === true)
  }
}
