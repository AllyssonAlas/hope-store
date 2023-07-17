import { RequestHandler } from 'express';

import { Middleware } from '@/application/middlewares';

export const adaptExpressMiddleware = (middleware: Middleware): RequestHandler => {
  return async (req, res, next) => {
    await middleware.handle({ ...req.headers });
  };
};
