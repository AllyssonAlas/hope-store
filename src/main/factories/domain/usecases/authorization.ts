import { setupAuthorization, Authorization } from '@/domain/usecases';
import { makeJwtTokenHandler } from '@/main/factories/infra/gateways';

export const makeAuthorizationUsecase = (): Authorization => {
  return setupAuthorization(makeJwtTokenHandler());
};
