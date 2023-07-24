import { PrismaClient } from '@prisma/client';

import { PgProductRepository } from '@/infra/database/postgres/repositories';

describe('PgProductRepository', () => {
  let sut: PgProductRepository;
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  beforeEach(async () => {
    sut = new PgProductRepository();
  });

  afterEach(async () => {
    await prisma.product.deleteMany({});
  });

  describe('create', () => {
    it('Should return an user if email exists', async () => {
      await sut.create({
        name: 'any_product_name',
        description: 'any_product_description',
        price: 10,
        quantity: 2,
      });

      const product = await prisma.product.findFirst({
        where: {
          name: 'any_product_name',
        },
      });

      expect(product?.id).toBeTruthy();
      expect(product?.name).toBe('any_product_name');
      expect(product?.description).toBe('any_product_description');
      expect(JSON.stringify(product?.price)).toBe(JSON.stringify('10'));
      expect(product?.quantity).toBe(2);
    });
  });
});
