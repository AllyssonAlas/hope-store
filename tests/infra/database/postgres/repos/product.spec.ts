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

  describe('loadList', () => {
    it('Should return a product list', async () => {
      const newDate = new Date();

      await prisma.product.createMany({
        data: [
          {
            id: 'product_id_1',
            name: 'any_product_name',
            description: 'any_product_description',
            price: 50,
            quantity: 10,
            createdAt: newDate,
            updatedAt: newDate,
          },
          {
            id: 'product_id_2',
            name: 'any_product_name',
            description: 'any_product_description',
            price: 10,
            quantity: 50,
            createdAt: newDate,
            updatedAt: newDate,
          },
        ],
      });

      const productsList = await sut.loadList({ ids: ['product_id_1', 'product_id_2'] });

      expect(productsList).toEqual([
        {
          id: 'product_id_1',
          name: 'any_product_name',
          description: 'any_product_description',
          price: 50,
          quantity: 10,
          createdAt: newDate,
          updatedAt: newDate,
        },
        {
          id: 'product_id_2',
          name: 'any_product_name',
          description: 'any_product_description',
          price: 10,
          quantity: 50,
          createdAt: newDate,
          updatedAt: newDate,
        },
      ]);
      expect(productsList).toHaveLength(2);
    });

    it('Should return an empty product list', async () => {
      await prisma.product.createMany({
        data: [
          {
            id: 'product_id_1',
            name: 'any_product_name',
            description: 'any_product_description',
            price: 50,
            quantity: 10,
          },
        ],
      });

      const productsList = await sut.loadList({ ids: ['product_id_2', 'product_id_3'] });

      expect(productsList).toEqual([]);
      expect(productsList).toHaveLength(0);
    });
  });
});
