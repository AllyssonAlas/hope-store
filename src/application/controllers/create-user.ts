import { CreateUser } from '@/domain/usecases';
import { EmailAlreadyExistsError, NonexistentRoleError } from '@/domain/errors';
import { HttpResponse, badRequest, forbidden, serverError, noContent } from '@/application/helpers';
import { RequiredParamError, InvalidRequiredParamError } from '@/application/errors';

type Model = Error | null;

export class CreateUserController {
  constructor(private readonly createUser: CreateUser) {}

  async handle(httpRequest: any):Promise<HttpResponse<Model>> {
    try {
      const fields = ['name', 'email', 'password', 'role'];
      for (const field of fields) {
        if (!Object.keys(httpRequest).includes(field)) {
          return badRequest(new RequiredParamError(field));
        }
      }
      if (!(/^[\w.]+@\w+.\w{2,}(?:.\w{2})?$/gmi).test(httpRequest.email)) {
        return badRequest(new InvalidRequiredParamError('email'));
      }
      await this.createUser(httpRequest);
      return noContent();
    } catch (error) {
      if (error instanceof EmailAlreadyExistsError || error instanceof NonexistentRoleError) {
        return forbidden();
      }

      return serverError(error instanceof Error ? error : undefined);
    }
  }
}
