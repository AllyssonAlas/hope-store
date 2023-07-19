import { UnauthorizedError, ForbiddenError, ServerError } from '@/application/errors';

export type HttpResponse <T = any> = {
  data: T;
  statusCode: number;
}

export const ok = <T = any>(data: T): HttpResponse<T> => ({
  data,
  statusCode: 200,
});

export const noContent = (): HttpResponse<null> => ({
  data: null,
  statusCode: 204,
});

export const badRequest = (error: Error): HttpResponse<Error> => ({
  data: error,
  statusCode: 400,
});

export const unauthorized = (): HttpResponse<Error> => ({
  data: new UnauthorizedError(),
  statusCode: 401,
});

export const forbidden = (): HttpResponse<Error> => ({
  data: new ForbiddenError(),
  statusCode: 403,
});

export const serverError = (error?: Error): HttpResponse<Error> => ({
  data: new ServerError(error),
  statusCode: 500,
});
