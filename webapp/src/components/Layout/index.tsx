import { TrpcRouterOutput } from '@management/backend/src/router'
import cn from 'classnames'
import { Link, Outlet, useLocation } from 'react-router'

import { useMe } from '../../lib/ctx'
import { links } from '../../lib/links'
import { type ILink } from '../../lib/links'

import css from './index.module.scss'

export const Layout = () => {
  const me = useMe()
  const location = useLocation()
  return (
    <div className={css.container}>
      <div className={css.stickyContainer}>
        <header className={css.header}>
          <h1 className={css.headerText}>TODO</h1>
          <nav className={css.navigation}>
            <ul className={css.list}>
              {defineLinksFilter(links, me).map((link) => (
                <li className={css.item} key={link.to}>
                  <Link
                    className={cn({
                      [css.reactLink]: true,
                      [css.active]: location.pathname === link.to,
                    })}
                    to={link.to}
                  >
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
      </div>
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
