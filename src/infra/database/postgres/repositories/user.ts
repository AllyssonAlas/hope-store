import { PrismaClient } from '@prisma/client';

import { LoadUserRepository } from '@/domain/contracts/repositories';

export class PgUserRepository implements LoadUserRepository {
  async load({ email }: LoadUserRepository.Input): Promise<LoadUserRepository.Output> {
    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    return user;
  }
}
