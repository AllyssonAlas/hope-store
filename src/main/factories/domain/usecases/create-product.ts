import { setupCreateProduct, CreateProduct } from '@/domain/usecases';
import { makePgProductRepo } from '@/main/factories/infra/repositories/postgres';

export const makeCreateProductUsecase = (): CreateProduct => {
  return setupCreateProduct(makePgProductRepo());
};
