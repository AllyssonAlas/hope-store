import { Router } from 'express';
import { makeCreateOrderController } from '@/main/factories/application/controllers';
import { makeAuthorizationMiddleware } from '@/main/factories/application/middlewares';
import { adaptExpressRoute as adaptRoute, adaptExpressMiddleware as adaptMiddleware } from '@/main/adapters';

export default (router: Router): void => {
  router.post(
    '/order/create',
    adaptMiddleware(makeAuthorizationMiddleware('create_order')),
    adaptRoute(makeCreateOrderController(),
    ));
};
