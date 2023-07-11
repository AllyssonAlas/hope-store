import { Router } from 'express';
import { makeCreateProductController } from '@/main/factories/application/controllers';
import { adaptExpressRoute as adapt } from '@/main/adapters';

export default (router: Router): void => {
  router.post('/product/create', adapt(makeCreateProductController()));
};
