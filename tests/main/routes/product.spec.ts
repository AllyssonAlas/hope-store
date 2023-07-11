import request from 'supertest';
import { PrismaClient } from '@prisma/client';

import { app } from '@/main/config/app';

describe('Product Routes', () => {
  describe('/POST /product/create', () => {
    let prisma: PrismaClient;

    beforeAll(() => {
      prisma = new PrismaClient();
    });

    afterEach(async () => {
      await prisma.product.deleteMany({});
    });

    it('Should return 200 on success', async () => {
      const { body, status } = await request(app).post('/api/product/create').send({
        name: 'any_product_name',
        description: 'any_product_description',
        price: 10.5,
        quantity: 50,
      });

      expect(status).toBe(204);
      expect(body).toEqual({});
    });
  });
});
