import request from 'supertest';
import { PrismaClient } from '@prisma/client';

import { app } from '@/main/config/app';
import { ForbiddenError } from '@/application/errors';

describe('User Routes', () => {
  describe('/POST /user/create', () => {
    let prisma: PrismaClient;

    beforeAll(() => {
      prisma = new PrismaClient();
    });

    afterEach(async () => {
      await prisma.user.deleteMany({});
      await prisma.role.deleteMany({});
      await prisma.permission.deleteMany({});
    });

    it('Should return 204 on success', async () => {
      await prisma.role.create({
        data: {
          id: 'any_role_id',
          name: 'any_role_name',

        },
      });

      const { body, status } = await request(app).post('/api/user/create').send({
        name: 'any_user_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        role: 'any_role_name',
      });

      expect(status).toBe(204);
      expect(body).toEqual({});
    });

    it('Should return 403 if an existing email is provided', async () => {
      await prisma.role.create({
        data: {
          id: 'any_role_id',
          name: 'any_role_name',
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

      const { body, status } = await request(app).post('/api/user/create').send({
        name: 'any_user_name',
        email: 'any_existing_email@mail.com',
        password: 'any_password',
        role: 'any_role_name',
      });

      expect(status).toBe(403);
      expect(body).toEqual({ error: new ForbiddenError().message });
    });
  });

  it('Should return 403 if an unexisting role is provided', async () => {
    const { body, status } = await request(app).post('/api/user/create').send({
      name: 'any_user_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      role: 'any_role',
    });

    expect(status).toBe(403);
    expect(body).toEqual({ error: new ForbiddenError().message });
  });
});
