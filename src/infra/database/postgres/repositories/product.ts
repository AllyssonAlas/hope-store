import { PrismaClient } from '@prisma/client';

import { CreateProductRepository, LoadProductsListRepository } from '@/domain/contracts/repositories';

export class PgProductRepository implements CreateProductRepository, LoadProductsListRepository {
  private prisma = new PrismaClient();

  async create(input: CreateProductRepository.Input): Promise<void> {
    await this.prisma.product.create({ data: input });
  }

  async loadList({ ids }: LoadProductsListRepository.Input): Promise<LoadProductsListRepository.Output> {
    const products = await this.prisma.product.findMany({
      where: {
        id: { in: ids },
      },
    });
    const productsFormatted = products.map(product => ({
      ...product,
      price: Number(product.price),
    }));
    return productsFormatted;
  }
}
