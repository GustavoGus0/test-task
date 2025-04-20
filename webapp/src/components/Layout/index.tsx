import { Link, Outlet } from 'react-router'

import { links } from '../../lib/links'

import css from './index.module.scss'

export const Layout = () => {
  return (
    <div className={css.container}>
      <header className={css.header}>
        <h1 className={css.headerText}>TODO</h1>
        <nav className={css.navigation}>
          <ul className={css.list}>
            {links.map((link) => (
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
