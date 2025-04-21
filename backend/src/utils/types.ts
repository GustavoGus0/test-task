import { type User } from '@prisma/client'
import { type Request } from 'express'

export type ExpressRequest = Request & {
  user: User | undefined
}

export type TaskStatus = 'to-do' | 'in-progress' | 'completed' | 'cancelled'
export type TaskPriority = 'low' | 'medium' | 'high'
export type UserRole = 'MANAGER' | 'EXECUTOR'
