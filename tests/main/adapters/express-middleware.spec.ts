import { NextFunction, Request, Response, RequestHandler } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { mock, MockProxy } from 'jest-mock-extended';

import { Middleware } from '@/application/middlewares';
import { adaptExpressMiddleware } from '@/main/adapters';

describe('ExpressMiddleware', () => {
  let sut: RequestHandler;
  let req: Request;
  let res: Response;
  let next: NextFunction;
  let middleware: MockProxy<Middleware>;

  beforeAll(() => {
    req = getMockReq({ headers: { any: 'any' } });
    res = getMockRes().res;
    next = getMockRes().next;
    middleware = mock();
    middleware.handle.mockResolvedValue({
      statusCode: 200,
      data: {
        emptyProperty: '',
        nullProp: null,
        undefinedProp: undefined,
        prop: 'any_value',
      },
    });
  });

  beforeEach(() => {
    sut = adaptExpressMiddleware(middleware);
  });

  it('Should call handle with correct request', async () => {
    await sut(req, res, next);

    expect(middleware.handle).toHaveBeenCalledWith({ any: 'any' });
    expect(middleware.handle).toHaveBeenCalledTimes(1);
  });

  it('Should call handle with empty request', async () => {
    req = getMockReq();

    await sut(req, res, next);

    expect(middleware.handle).toHaveBeenCalledWith({});
    expect(middleware.handle).toHaveBeenCalledTimes(1);
  });

  it('Should respond with correct error and statusCode', async () => {
    middleware.handle.mockResolvedValueOnce({
      statusCode: 500,
      data: new Error('any_error'),
    });

    await sut(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ error: 'any_error' });
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  it('Should add data to req.locals', async () => {
    await sut(req, res, next);

    expect(req.locals).toEqual({ prop: 'any_value' });
    expect(next).toHaveBeenCalledTimes(1);
  });
});
