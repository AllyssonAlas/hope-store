import { PrismaClient } from '@prisma/client';

import { SaveOrderRepository } from '@/domain/contracts/repositories';

export class PgOrderRepository implements SaveOrderRepository {
  private prisma = new PrismaClient();

  async save({ address, ...rest }: SaveOrderRepository.Input): Promise<SaveOrderRepository.Output> {
    const addressData = await this.prisma.address.create({
      data: address,
    });
    const order = await this.prisma.order.create({
      data: {
        ...rest, addressId: addressData.id,
      },
    });
    return {
      id: order.id,
      products: order.products as any,
      value: Number(order.value),
      status: order.status,
    };
  }
}
