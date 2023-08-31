import request from 'supertest';
import { PrismaClient } from '@prisma/client';

import { app } from '@/main/config/app';

import { mockAuthorizationToken } from '@/tests/main/mocks';

describe('Order Routes', () => {
  describe('/POST /order/create', () => {
    let prisma: PrismaClient;
    const getAddressSpy = jest.fn();

    jest.mock('@/infra/gateways/postal-code-api', () => ({
      PostalCodeApi: jest.fn().mockReturnValue({
        getAddress: getAddressSpy,
      }),
    }));

    beforeAll(() => {
      prisma = new PrismaClient();
    });

    afterEach(async () => {
      await prisma.user.deleteMany({});
      await prisma.role.deleteMany({});
      await prisma.permission.deleteMany({});
      await prisma.product.deleteMany({});
      await prisma.order.deleteMany({});
    });

    it('Should return 200 on success', async () => {
      getAddressSpy.mockReturnValueOnce({
        postalCode: 'any_postal_code',
        city: 'any_city',
        neighborhood: 'any_neighborhood',
        street: 'any_street',
      });
      await prisma.product.create({
        data: {
          id: 'any_product_id_1',
          name: 'any_product_name',
          description: 'any_product_description',
          price: 50,
          quantity: 10,
        },
      });
      const authorization = await mockAuthorizationToken('create_order');

      const { body, status } = await request(app)
        .post('/api/order/create')
        .set('authorization', authorization)
        .send({
          products: [
            { id: 'any_product_id_1', quantity: 1 },
          ],
          contact: 'any_contact_@gmail.com',
          address: {
            number: 'any_number',
            street: 'any_street',
            neighborhood: 'any_neighborhood',
            city: 'any_city',
            postalCode: 'any_postal_code',
            state: 'any_state',
          },
        });

      expect(status).toBe(200);
      expect(body.id).toBeTruthy();
      expect(body.products).toEqual([
        { id: 'any_product_id_1', quantity: 1 },
      ]);
      expect(body.status).toBe('pending');
      expect(body.value).toBe(50);
    });

    it('Should return 400 wit correct error', async () => {
      getAddressSpy.mockReturnValueOnce({
        postalCode: 'any_postal_code',
        city: 'any_city',
        neighborhood: 'any_neighborhood',
        street: 'any_street',
      });

      const authorization = await mockAuthorizationToken('create_order');

      const { body, status } = await request(app)
        .post('/api/order/create')
        .set('authorization', authorization)
        .send({
          products: [
            { id: 'any_product_id_1', quantity: 1 },
          ],
          contact: 'any_contact_@gmail.com',
          address: {
            number: 'any_number',
            street: 'any_street',
            neighborhood: 'any_neighborhood',
            city: 'any_city',
            postalCode: 'any_postal_code',
            state: 'any_state',
          },
        });

      expect(status).toBe(400);
      expect(body).toEqual({
        error: 'Error: product with id any_product_id_1 was not found',
      });
    });
  });
});
