import { trpc } from '../../lib/trpc'

interface ITask {
  id: string
  title: string
  description: string
  status: 'to-do' | 'in-progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high'
}
const tasks: ITask[] = [
  {
    id: '1',
    title: 'Task 1',
    description: 'Description 1',
    status: 'in-progress',
    priority: 'medium',
  },
  {
    id: '2',
    title: 'Task 2',
    description: 'Description 2',
    status: 'in-progress',
    priority: 'high',
  },
  {
    id: '3',
    title: 'Task 3',
    description: 'Description 3',
    status: 'to-do',
    priority: 'low',
  },
  {
    id: '4',
    title: 'Task 4',
    description: 'Description 4',
    status: 'completed',
    priority: 'high',
  },
  {
    id: '5',
    title: 'Task 5',
    description: 'Description 5',
    status: 'cancelled',
    priority: 'low',
  },
]

export const getTasksTrpcRoute = trpc.procedure.query(() => {
  return { tasks }
})
