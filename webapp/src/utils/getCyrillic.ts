import {
  UserRole,
  TaskPriority,
  TaskStatus,
  DateFilter,
  TaskFilter,
} from '@management/backend/src/utils/types'

export const getCyrillicStatus = (
  status: TaskStatus,
  options?: { communion: boolean } | undefined
) => {
  if (options?.communion) {
    switch (status) {
      case 'completed':
        return 'Выполненные'
      case 'cancelled':
        return 'Отменённые'
      default:
        return 'Ошибка перевода статуса'
    }
  } else {
    switch (status) {
      case 'to-do':
        return 'К выполнению'
      case 'in-progress':
        return 'Выполняется'
      case 'completed':
        return 'Выполнена'
      case 'cancelled':
        return 'Отменена'
      default:
        return 'Ошибка перевода статуса'
    }
  }
}

export const getCyrillicPriority = (priority: TaskPriority) => {
  switch (priority) {
    case 'low':
      return 'Низкий'
    case 'medium':
      return 'Средний'
    case 'high':
      return 'Высокий'
    default:
      return 'Ошибка перевода приоритета'
  }
}

export const getCyrillicRole = (role: UserRole) => {
  switch (role) {
    case 'EXECUTOR':
      return 'Исполнитель'
    case 'MANAGER':
      return 'Руководитель'
    default:
      return 'Ошибка перевода роли'
  }
}

export const getCyrillicDataFilter = (filter: DateFilter) => {
  switch (filter) {
    case 'new':
      return 'Новые'
    case 'old':
      return 'Давние'
    default:
      return 'Ошибка перевода даты'
  }
}

export const getCyrillicTasksFilter = (filter: TaskFilter) => {
  switch (filter) {
    case 'all':
      return 'Все'
    case 'my':
      return 'Мои'
    case 'executors':
      return 'Исполнителей'
    case 'managers':
      return 'Руководителя'
    default:
      return 'Ошибка перевода задач'
  }
}
