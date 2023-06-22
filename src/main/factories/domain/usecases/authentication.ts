import { setupAuthentication, Authentication } from '@/domain/usecases';
import { makePgRoleRepo, makePgUserRepo } from '@/main/factories/infra/repositories/postgres';
import { makeBcryptAdapter, makeJwtTokenHandler } from '@/main/factories/infra/gateways';

export const makeAuthenticationUsecase = (): Authentication => {
  return setupAuthentication(
    makePgUserRepo(),
    makeBcryptAdapter(),
    makePgRoleRepo(),
    makeJwtTokenHandler(),
  );
};
