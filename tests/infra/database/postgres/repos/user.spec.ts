import { PrismaClient } from '@prisma/client';

import { PgUserRepository } from '@/infra/database/postgres/repositories';

describe('PgUserRepository', () => {
  let sut: PgUserRepository;
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  beforeEach(async () => {
    sut = new PgUserRepository();
  });

  afterEach(async () => {
    await prisma.user.deleteMany({});
    await prisma.role.deleteMany({});
    await prisma.permission.deleteMany({});
  });

  describe('load', () => {
    it('Should return an user if email exists', async () => {
      await prisma.role.create({
        data: {
          id: 'any_role_id',
          name: 'any_role_name',
          permissions: {
            create: [{ name: 'any_permission_1' }, { name: 'any_permission_2' }],
          },
        },
      });

      await prisma.user.create({
        data: {
          name: 'any_name',
          email: 'any_existing_email@mail.com',
          password: 'any_password',
          role: 'any_role_name',
        },
      });

      const user = await sut.load({ email: 'any_existing_email@mail.com' });

      expect(user?.id).toBeTruthy();
      expect(user?.name).toBe('any_name');
      expect(user?.email).toBe('any_existing_email@mail.com');
    });

    it('Should return null if email does not exist', async () => {
      const user = await sut.load({ email: 'non_existing_email@mail.com' });

      expect(user).toBeNull();
    });
  });

  describe('save', () => {
    it('Should save an user with provided data', async () => {
      await prisma.role.create({
        data: {
          id: 'any_role_id',
          name: 'any_role_name',
        },
      });

      await sut.save({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        role: 'any_role_name',
      });

      const user = await prisma.user.findFirst({
        where: {
          email: 'any_email@mail.com',
        },
      });

      expect(user?.id).toBeTruthy();
      expect(user?.name).toBe('any_name');
      expect(user?.email).toBe('any_email@mail.com');
      expect(user?.password).toBe('any_password');
      expect(user?.role).toBe('any_role_name');
    });
  });
});
