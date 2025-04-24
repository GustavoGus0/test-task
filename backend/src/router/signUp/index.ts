import { trpc } from '../../lib/trpc'
import { getPasswordHash } from '../../utils/getPasswordHash'
import { signJWT } from '../../utils/signJWT'

import { zSignUpTrpcInput } from './input'

export const signUpTrpcRoute = trpc.procedure
  .input(zSignUpTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const existingUser = await ctx.prisma.user.findUnique({
      where: { login: input.login },
      select: { id: true },
    })

    if (existingUser) {
      throw new Error('Пользователь с таким логином уже существует')
    }

    if (input.role === 'EXECUTOR' && input.managerId) {
      const manager = await ctx.prisma.user.findUnique({
        where: { id: input.managerId },
        select: { id: true, role: true },
      })
      if (!manager || manager.role !== 'MANAGER') {
        throw new Error('Указанный менеджер не существует или не является менеджером')
      }
    }

    const newUser = await ctx.prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          login: input.login,
          firstName: input.firstName,
          lastName: input.lastName,
          patronymic: input.patronymic,
          password: getPasswordHash(input.password),
          role: input.role,
          managerId: input.role === 'EXECUTOR' ? input.managerId : undefined,
        },
      })

      if (input.role === 'EXECUTOR' && input.managerId) {
        await prisma.user.update({
          where: { id: input.managerId },
          data: {
            executors: { connect: { id: user.id } },
          },
        })
      }

      return user
    })

    const token = signJWT(newUser.id)
    return { token }
  })
