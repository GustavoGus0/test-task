export const getCyrillicStatus = (status: 'to-do' | 'in-progress' | 'completed' | 'cancelled') => {
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

export const getCyrillicPriority = (priority: 'low' | 'medium' | 'high') => {
  switch (priority) {
    case 'low':
      return 'Низкий'
    case 'medium':
      return 'Средний'
    case 'high':
      return 'Высокий'
  }
}
