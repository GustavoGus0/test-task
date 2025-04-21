import { TaskPriority, TaskStatus } from '@management/backend/src/utils/types'

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
