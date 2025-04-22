import {
  UserRole,
  TaskPriority,
  TaskStatus,
  DateFilter,
  TaskFilter,
} from '@management/backend/src/utils/types'

export const getCyrillicStatus = (status: TaskStatus) => {
  switch (status) {
    case 'to-do':
      return 'К выполнению'
    case 'in-progress':
      return 'Выполняется'
    case 'completed':
      return 'Выполнена'
    case 'cancelled':
      return 'Отменена'
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
  }
}

export const getCyrillicRole = (role: UserRole) => {
  switch (role) {
    case 'EXECUTOR':
      return 'Исполнитель'
    case 'MANAGER':
      return 'Менеджер'
  }
}

export const getCyrillicDataFilter = (filter: DateFilter) => {
  switch (filter) {
    case 'new':
      return 'Новые'
    case 'old':
      return 'Старые'
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
  }
}
