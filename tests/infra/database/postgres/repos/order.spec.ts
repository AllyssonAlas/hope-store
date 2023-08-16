
import { PrismaClient } from '@prisma/client';

import { PgOrderRepository } from '@/infra/database/postgres/repositories';

describe('PgProductRepository', () => {
  let sut: PgOrderRepository;
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  beforeEach(async () => {
    sut = new PgOrderRepository();
  });

  afterEach(async () => {
    await prisma.user.deleteMany({});
    await prisma.permission.deleteMany({});
    await prisma.role.deleteMany({});
    await prisma.address.deleteMany({});
    await prisma.order.deleteMany({});
  });

  describe('save', () => {
    it('Should save an order', async () => {
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
          id: 'any_user_id',
          name: 'any_name',
          email: 'any_existing_email@mail.com',
          password: 'any_password',
          role: 'any_role_name',
        },
      });

      const order = await sut.save({
        userId: 'any_user_id',
        products: [
          { id: 'any_product_id_1', quantity: 3 },
          { id: 'any_product_id_2', quantity: 5 },
        ],
        contact: 'any_contact@mail.com',
        address: {
          street: 'any_street_name',
          number: 'any_number_',
          neighborhood: 'any_neighborhood_name',
          city: 'any_city_name',
          state: 'any_state',
          postalCode: 'any_postal_code',
        },
        status: 'pending',
        value: 50,
      });

      expect(order.id).toBeTruthy();
      expect(order.products).toEqual([
        { id: 'any_product_id_1', quantity: 3 },
        { id: 'any_product_id_2', quantity: 5 },
      ]);
      expect(order.status).toBe('pending');
      expect(order.value).toBe(50);
    });
  });
});
