import { CreateProductController } from '@/application/controllers';
import { makeCreateProductUsecase } from '@/main/factories/domain/usecases';

export const makeCreateProductController = (): CreateProductController => {
  return new CreateProductController(makeCreateProductUsecase());
};
