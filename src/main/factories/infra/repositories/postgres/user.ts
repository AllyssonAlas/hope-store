import { PgUserRepository } from '@/infra/database/postgres/repositories';

export const makePgUserRepo = (): PgUserRepository => {
  return new PgUserRepository();
};
