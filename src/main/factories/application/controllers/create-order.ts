import { CreateOrderController } from '@/application/controllers';
import { makeCreateOrderUsecase } from '@/main/factories/domain/usecases';

export const makeCreateOrderController = (): CreateOrderController => {
  return new CreateOrderController(makeCreateOrderUsecase());
};
