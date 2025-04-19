import { Link, Outlet } from 'react-router'

import { getNewTaskRoute, getTasksRoute } from '../../lib/routes'

import css from './index.module.scss'

export const Layout = () => {
  return (
    <div className={css.container}>
      <header className={css.header}>
        <h1 className={css.headerText}>TODO</h1>
        <nav className={css.navigation}>
          <ul className={css.list}>
            <li className={css.item}>
              <Link className={css.reactLink} to={getTasksRoute()}>
                Задачи
              </Link>
            </li>
            <li className={css.item}>
              <Link className={css.reactLink} to={getNewTaskRoute()}>
                Новая задача
              </Link>
            </li>
            <li className={css.item}>
              <Link className={css.reactLink} to={'#'}>
                Выйти
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className={css.content}>
        <Outlet />
      </main>
    </div>
  )
}
