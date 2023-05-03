import request from 'supertest';
import { app } from '@/main/config/app';

import { PrismaClient } from '@prisma/client';

describe('User Routes', () => {
  describe('/POST /user/create', () => {
    let prisma: PrismaClient;

    beforeAll(() => {
      prisma = new PrismaClient();
    });

    afterEach(async () => {
      await prisma.user.deleteMany({});
      await prisma.role.deleteMany({});
    });

    it('Should return 204 on success', async () => {
      await prisma.role.create({
        data: {
          id: 'any_role_id',
          name: 'any_role',
        },
      });

      await request(app).post('/api/user/create').send({
        name: 'any_user_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        roleId: 'any_role',
      }).expect(204);
    });
  });
});