import { PrismaClient } from '@prisma/client';

import { PgUserRepository } from '@/infra/database/postgres/repositories';

describe('PgUserRepository', () => {
  let prisma: PrismaClient;
  let sut: PgUserRepository;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  beforeEach(async () => {
    sut = new PgUserRepository();
  });

  afterEach(async () => {
    await prisma.user.deleteMany({});
    await prisma.role.deleteMany({});
  });

  describe('load', () => {
    it('Should return an user if email exists', async () => {
      await prisma.role.create({
        data: {
          id: 'any_role_id',
          name: 'any_role',
        },
      });

      await prisma.user.create({
        data: {
          name: 'any_name',
          email: 'any_existing_email@mail.com',
          password: 'any_password',
          roleId: 'any_role_id',
        },
      });

      const user = await sut.load({ email: 'any_existing_email@mail.com' });

      expect(user?.id).toBeTruthy();
      expect(user?.name).toBe('any_name');
      expect(user?.email).toBe('any_existing_email@mail.com');
    });
  });

  it('Should return null if email does not exist', async () => {
    const user = await sut.load({ email: 'non_existing_email@mail.com' });

    expect(user).toBeNull();
  });
});