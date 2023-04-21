import { PrismaClient } from '@prisma/client';

import { PgRoleRepository } from '@/infra/database/postgres/repositories';

describe('PgRoleRepository', () => {
  let prisma: PrismaClient;
  let sut: PgRoleRepository;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  beforeEach(async () => {
    sut = new PgRoleRepository();
  });

  afterEach(async () => {
    await prisma.role.deleteMany({});
  });

  describe('load', () => {
    it('Should return an role if name exists', async () => {
      await prisma.role.create({ data: { name: 'any_role_name' } });

      const role = await sut.load({ name: 'any_role_name' });

      expect(role?.id).toBeTruthy();
      expect(role?.name).toBe('any_role_name');
    });

    it('Should return null if name does not exist', async () => {
      const role = await sut.load({ name: 'invalid_role_name' });

      expect(role).toBeNull();
    });
  });
});
