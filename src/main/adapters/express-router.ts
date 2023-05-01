import { RequestHandler } from 'express';

import { Controller } from '@/application/controllers';

export const adaptExpressRoute = (controller: Controller): RequestHandler => {
  return async (req, res) => {
    const { data, statusCode } = await controller.handle({ ...req.body });
    const json = [200, 204].includes(statusCode) ? data : { error: data.message };
    res.status(statusCode).json(json);
  };
};
