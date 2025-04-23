import { icons } from '../assets/icons'

import {
  getArchivedTasksRoute,
  getNewTaskRoute,
  getSignInRoute,
  getSignOutRoute,
  getSignUpRoute,
  getTasksRoute,
} from './routes'

export interface ILink {
  to: string
  label: string
  icon: React.ReactNode | null
  forAuth: boolean
  canSeeNotAuth: boolean
}

export const links: ILink[] = [
  {
    to: getTasksRoute(),
    label: 'Задачи',
    icon: icons.tasks(),
    forAuth: true,
    canSeeNotAuth: true,
  },
  {
    to: getNewTaskRoute(),
    label: 'Новая задача',
    icon: icons.newTask(),
    forAuth: true,
    canSeeNotAuth: false,
  },
  {
    to: getArchivedTasksRoute(),
    label: 'Архив',
    icon: icons.archive(),
    forAuth: true,
    canSeeNotAuth: false,
  },
  {
    to: getSignUpRoute(),
    label: 'Регистрация',
    icon: icons.signUp(),
    forAuth: false,
    canSeeNotAuth: true,
  },
  {
    to: getSignInRoute(),
    label: 'Вход',
    icon: icons.signIn(),
    forAuth: false,
    canSeeNotAuth: true,
  },
  {
    to: getSignOutRoute(),
    label: 'Выйти',
    icon: icons.signOut(),
    forAuth: true,
    canSeeNotAuth: false,
  },
]
