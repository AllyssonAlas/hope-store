import { PgRoleRepository } from '@/infra/database/postgres/repositories';

export const makePgRoleRepo = (): PgRoleRepository => {
  return new PgRoleRepository();
};
