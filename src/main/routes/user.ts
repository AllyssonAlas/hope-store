import { Router } from 'express';
import { makeCreateUserController } from '@/main/factories/application/controllers';
import { adaptExpressRoute as adapt } from '@/main/adapters';

export default (router: Router): void => {
  router.post('/user/create', adapt(makeCreateUserController()));
};
