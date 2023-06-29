import { PrismaClient } from '@prisma/client';

import { CreateProductRepository } from '@/domain/contracts/repositories';

export class PgProductRepository implements CreateProductRepository {
  private prisma = new PrismaClient();

  async create(input: CreateProductRepository.Input): Promise<void> {
    await this.prisma.product.create({ data: input });
  }
}
