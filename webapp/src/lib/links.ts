import { icons } from '../assets/icons'

import { getNewTaskRoute, getTasksRoute } from './routes'

export const links = [
  {
    to: getTasksRoute(),
    label: 'Задачи',
    icon: icons.tasks(),
  },
  {
    to: getNewTaskRoute(),
    label: 'Новая задача',
    icon: icons.newTask(),
  },
  {
    to: '#',
    label: 'Выйти',
    icon: icons.signOut(),
  },
]
