import { forbidden, HttpResponse } from '@/application/helpers';

type HttpRequest = {
  authorization: string;
}

export class AuthorizationMiddleware {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return forbidden();
  }
}
