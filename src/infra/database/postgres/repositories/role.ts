import { PrismaClient } from '@prisma/client';

import { LoadRoleRepository } from '@/domain/contracts/repositories';

export class PgRoleRepository implements LoadRoleRepository {
  async load({ name }: LoadRoleRepository.Input): Promise<LoadRoleRepository.Output> {
    const prisma = new PrismaClient();
    const role = await prisma.role.findFirst({ where: { name }, include: { permissions: true } });
    if (!role) {
      return null;
    }
    return { ...role, permissions: role.permissions.map(({ name }) => name) };
  }
}
