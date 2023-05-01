import { setupCreateUser, CreateUser } from '@/domain/usecases';
import { makePgRoleRepo, makePgUserRepo } from '@/main/factories/infra/repositories/postgres';
import { makeBcryptAdapter } from '@/main/factories/infra/gateways';

export const makeCreateUserUsecase = (): CreateUser => {
  return setupCreateUser(makePgUserRepo(), makePgRoleRepo(), makeBcryptAdapter());
};
