import { PrismaClient } from '@prisma/client';

import { PgRoleRepository } from '@/infra/database/postgres/repositories';

describe('PgRoleRepository', () => {
  let sut: PgRoleRepository;
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  beforeEach(async () => {
    sut = new PgRoleRepository();
  });

  afterEach(async () => {
    await prisma.role.deleteMany({});
    await prisma.permission.deleteMany({});
  });

  describe('load', () => {
    it('Should return an role if name exists', async () => {
      await prisma.role.create({
        data: {
          name: 'any_role_name',
          permissions: {
            create: [
              { name: 'any_permission_1' },
              { name: 'any_permission_2' },
              { name: 'any_permission_3' },
            ],
          },
        },
      });

      const role = await sut.load({ name: 'any_role_name' });

      expect(role?.id).toBeTruthy();
      expect(role?.name).toBe('any_role_name');
      expect(role?.permissions).toEqual([
        'any_permission_1',
        'any_permission_2',
        'any_permission_3',
      ]);
    });

    it('Should return an role with only belonging permissions', async () => {
      await prisma.role.create({
        data: {
          name: 'any_role_name_1',
          permissions: {
            create: [{ name: 'any_permission_1' }, { name: 'any_permission_2' }],
          },
        },
      });

      await prisma.role.create({
        data: {
          name: 'any_role_name_2',
          permissions: {
            create: [
              { name: 'any_permission_3' },
            ],
          },
        },
      });

      const role1 = await sut.load({ name: 'any_role_name_1' });
      const role2 = await sut.load({ name: 'any_role_name_2' });

      expect(role1?.id).toBeTruthy();
      expect(role1?.name).toBe('any_role_name_1');
      expect(role1?.permissions).toEqual(['any_permission_1', 'any_permission_2']);
      expect(role2?.id).toBeTruthy();
      expect(role2?.name).toBe('any_role_name_2');
      expect(role2?.permissions).toEqual(['any_permission_3']);
    });

    it('Should return null if name does not exist', async () => {
      const role = await sut.load({ name: 'invalid_role_name' });

      expect(role).toBeNull();
    });
  });
});
