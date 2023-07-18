import { RequestHandler } from 'express';

import { Middleware } from '@/application/middlewares';

export const adaptExpressMiddleware = (middleware: Middleware): RequestHandler => {
  return async (req, res, next) => {
    const { data, statusCode } = await middleware.handle({ ...req.headers });
    if (statusCode === 200) {
      const validFields = Object.entries(data).filter((entry) => entry[1]);
      req.locals = { ...req.locals, ...Object.fromEntries(validFields) };
      next();
    } else {
      res.status(statusCode).json({ error: data.message });
    }
  };
};
