import { Authorization } from '@/domain/usecases';
import { forbidden, HttpResponse } from '@/application/helpers';

type HttpRequest = {
  authorization: string;
}

export class AuthorizationMiddleware {
  constructor(
    private readonly authorization: Authorization,
    private readonly requiredPermission: string,
  ) {}

  async handle({ authorization }: HttpRequest): Promise<HttpResponse> {
    await this.authorization({
      token: authorization,
      requiredPermission: this.requiredPermission,
    });
    return forbidden();
  }
}