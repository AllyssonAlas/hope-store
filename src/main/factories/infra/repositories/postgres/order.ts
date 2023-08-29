import { PgOrderRepository } from '@/infra/database/postgres/repositories';

export const makePgOrderRepo = (): PgOrderRepository => {
  return new PgOrderRepository();
};
