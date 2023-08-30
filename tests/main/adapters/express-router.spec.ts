import { Request, Response, RequestHandler, NextFunction } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { mock, MockProxy } from 'jest-mock-extended';

import { Controller } from '@/application/controllers';
import { adaptExpressRoute } from '@/main/adapters';

describe('ExpressRouter', () => {
  let sut: RequestHandler;
  let req: Request;
  let res: Response;
  let next: NextFunction;
  let controller: MockProxy<Controller>;

  beforeAll(() => {
    req = getMockReq({ body: { anyBody: 'any' }, locals: { anyLocals: 'any_locals' } });
    res = getMockRes().res;
    controller = mock();
    controller.handle.mockResolvedValue({
      statusCode: 200,
      data: { data: 'any_data' },
    });
  });

  beforeEach(() => {
    sut = adaptExpressRoute(controller);
  });

  it('Should call handle with correct request', async () => {
    await sut(req, res, next);

    expect(controller.handle).toHaveBeenCalledWith({ anyBody: 'any', anyLocals: 'any_locals' });
    expect(controller.handle).toHaveBeenCalledTimes(1);
  });

  it('Should respond with 200 and valid data', async () => {
    await sut(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ data: 'any_data' });
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  it('Should respond with 400 and valid error', async () => {
    controller.handle.mockResolvedValueOnce({
      statusCode: 400,
      data: new Error('any_error'),
    });

    await sut(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ error: 'any_error' });
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  it('Should respond with 500 and valid error', async () => {
    controller.handle.mockResolvedValueOnce({
      statusCode: 500,
      data: new Error('any_error'),
    });

    await sut(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ error: 'any_error' });
    expect(res.json).toHaveBeenCalledTimes(1);
  });
});
