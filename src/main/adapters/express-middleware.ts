import { RequestHandler } from 'express';

import { Middleware } from '@/application/middlewares';

export const adaptExpressMiddleware = (middleware: Middleware): RequestHandler => {
  return async (req, res, next) => {
    const { data, statusCode } = await middleware.handle({ ...req.headers });

    res.status(statusCode).json({ error: data.message });
  };
};
