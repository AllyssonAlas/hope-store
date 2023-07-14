import { Authorization } from '@/domain/usecases';
import { forbidden, HttpResponse, ok } from '@/application/helpers';
import { RequiredStringValidator } from '@/application/validation';

type HttpRequest = {
  authorization: string;
}

export class AuthorizationMiddleware {
  constructor(
    private readonly authorization: Authorization,
    private readonly requiredPermission: string,
  ) {}

  async handle({ authorization }: HttpRequest): Promise<HttpResponse> {
    try {
      if (this.validate({ authorization })) {
        return forbidden();
      }
      const { userId } = await this.authorization({
        token: authorization,
        requiredPermission: this.requiredPermission,
      });
      return ok({ userId });
    } catch (error) {
      return forbidden();
    }
  }

  private validate({ authorization }: HttpRequest): boolean {
    const error = new RequiredStringValidator(authorization, 'authorization').validate();
    return !!error;
  }
}
