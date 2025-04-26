import { z } from 'zod'

export const zSignUpTrpcInput = z.object({
  login: z
    .string()
    .trim()
    .min(1, 'Логин обязательно нужно указать')
    .regex(/^[A-Za-z0-9-]+$/, 'Логин может состоять только из латинских букв, цифр и дефиса'),
  firstName: z.string().trim().min(1, 'Имя обязательно нужно указать'),
  lastName: z.string().trim().min(1, 'Фамилию тоже нужно указать'),
  patronymic: z.string().trim().nullable(),
  password: z.string().trim().min(4, 'Пароль должен быть не менее 4 символов'),
  role: z
    .enum(['MANAGER', 'EXECUTOR'], { errorMap: () => ({ message: 'Нужно выбрать роль' }) })
    .nullable()
    .refine((val) => val !== null, 'Нужно выбрать роль'),
  managerId: z.string().optional(),
})
