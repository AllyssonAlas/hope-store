import { PgProductRepository } from '@/infra/database/postgres/repositories';

export const makePgProductRepo = (): PgProductRepository => {
  return new PgProductRepository();
};
