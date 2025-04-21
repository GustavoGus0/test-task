import { trpc } from '../../lib/trpc'
import { getPasswordHash } from '../../utils/getPasswordHash'
import { signJWT } from '../../utils/signJWT'

import { zSignUpTrpcInput } from './input'

export const signUpTrpcRoute = trpc.procedure
  .input(zSignUpTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const existingUser = await ctx.prisma.user.findUnique({
      where: {
        login: input.login,
      },
    })
    if (existingUser) {
      throw new Error('Пользователь с таким логином уже существует')
    }

    const user = await ctx.prisma.user.create({
      data: {
        login: input.login,
        firstName: input.firstName,
        lastName: input.lastName,
        patronymic: input.patronymic,
        password: getPasswordHash(input.password),
      },
    })
    const token = signJWT(user.id)
    return { token }
  })
