import request from 'supertest';
import { PrismaClient } from '@prisma/client';

import { app } from '@/main/config/app';

import { mockAuthorizationToken } from '@/tests/main/mocks';

describe('Product Routes', () => {
  describe('/POST /product/create', () => {
    let prisma: PrismaClient;

    beforeAll(() => {
      prisma = new PrismaClient();
    });

    afterEach(async () => {
      await prisma.user.deleteMany({});
      await prisma.role.deleteMany({});
      await prisma.permission.deleteMany({});
      await prisma.product.deleteMany({});
    });

    it('Should return 204 on success', async () => {
      const authorization = await mockAuthorizationToken('create_product');

      const { body, status } = await request(app)
        .post('/api/product/create')
        .set('authorization', authorization)
        .send({
          name: 'any_product_name',
          description: 'any_product_description',
          price: 10.5,
          quantity: 50,
        });

      expect(status).toBe(204);
      expect(body).toEqual({});
    });

    it('Should return 403 on success', async () => {
      const { body, status } = await request(app)
        .post('/api/product/create')
        .send({
          name: 'any_product_name',
          description: 'any_product_description',
          price: 10.5,
          quantity: 50,
        });

      expect(status).toBe(403);
      expect(body).toEqual({ error: 'Access denied' });
    });
  });
});
