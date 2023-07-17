import { NextFunction, Request, Response, RequestHandler } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { mock, MockProxy } from 'jest-mock-extended';

import { Middleware } from '@/application/middlewares';
import { adaptExpressMiddleware } from '@/main/adapters';

describe('ExpressMiddleware', () => {
  let req: Request;
  let res: Response;
  let middleware: MockProxy<Middleware>;
  let next: NextFunction;
  let sut: RequestHandler;

  beforeAll(() => {
    req = getMockReq({ headers: { any: 'any' } });
    res = getMockRes().res;
    next = getMockRes().next;
    middleware = mock();
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
});
