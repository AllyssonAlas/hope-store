import { PrismaClient } from '@prisma/client';

import { LoadUserRepository, SaveUserRepository } from '@/domain/contracts/repositories';

export class PgUserRepository implements LoadUserRepository, SaveUserRepository {
  private prisma = new PrismaClient();

  async load({ email }: LoadUserRepository.Input): Promise<LoadUserRepository.Output> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    return user;
  }

  async save(input: SaveUserRepository.Input): Promise<SaveUserRepository.Output> {
    await this.prisma.user.create({
      data: input,
    });
  }
}
