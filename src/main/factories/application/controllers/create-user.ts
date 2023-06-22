import { CreateUserController } from '@/application/controllers';
import { makeCreateUserUsecase, makeAuthenticationUsecase } from '@/main/factories/domain/usecases';

export const makeCreateUserController = (): CreateUserController => {
  return new CreateUserController(makeCreateUserUsecase(), makeAuthenticationUsecase());
};
