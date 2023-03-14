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
  });

  describe('load', () => {
    it('Should return an user if email exists', async () => {
      await prisma.user.create({
        data: {
          name: 'any_name',
          cpf: 'any_cpf',
          email: 'any_existing_email@mail.com',
          password: 'any_password',
          role: 'any_role_id',
        },
      });

      const user = await sut.load({ email: 'any_existing_email@mail.com' });

      expect(user?.id).toBeTruthy();
      expect(user?.name).toBe('any_name');
      expect(user?.email).toBe('any_existing_email@mail.com');
      expect(user?.role).toBe('any_role_id');
    });
  });

  it('Should return null if email does not exist', async () => {
    const user = await sut.load({ email: 'non_existing_email@mail.com' });

    expect(user).toBeNull();
  });
});
