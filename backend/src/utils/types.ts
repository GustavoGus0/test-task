import { type User } from '@prisma/client'
import { type Request } from 'express'

export type ExpressRequest = Request & {
  user: User | undefined
}

export type TaskStatus = 'to-do' | 'in-progress' | 'completed' | 'cancelled'
export type TaskPriority = 'low' | 'medium' | 'high'
export type UserRole = 'MANAGER' | 'EXECUTOR'
export type TaskFilter = 'all' | 'my' | 'executors' | 'managers'
export type DateFilter = 'new' | 'old'
export type TimeFilter = 'on-today' | 'on-week' | 'all-time'
