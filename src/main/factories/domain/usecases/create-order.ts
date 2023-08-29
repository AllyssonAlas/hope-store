import { setupCreateOrder, CreateOrder } from '@/domain/usecases';
import { makePgProductRepo, makePgOrderRepo } from '@/main/factories/infra/repositories/postgres';
import { makePostalCodeApi } from '@/main/factories/infra/gateways';

export const makeCreateOrderUsecase = (): CreateOrder => {
  return setupCreateOrder(makePgProductRepo(), makePostalCodeApi(), makePgOrderRepo());
};
