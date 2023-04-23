import { CreateUser } from '@/domain/usecases';
import { EmailAlreadyExistsError, NonexistentRoleError } from '@/domain/errors';
import { HttpResponse } from '@/application/helpers';
import { ForbiddenError, ServerError, RequiredParamError, InvalidRequiredParamError } from '@/application/errors';

export class CreateUserController {
  constructor(private readonly createUser: CreateUser) {}

  async handle(httpRequest: any):Promise<HttpResponse | any> {
    try {
      const fields = ['name', 'email', 'password', 'role'];
      for (const field of fields) {
        if (!Object.keys(httpRequest).includes(field)) {
          return {
            data: new RequiredParamError(field),
            statusCode: 400,
          };
        }
      }
      if (!(/^[\w.]+@\w+.\w{2,}(?:.\w{2})?$/gmi).test(httpRequest.email)) {
        return {
          data: new InvalidRequiredParamError('email'),
          statusCode: 400,
        };
      }
      await this.createUser(httpRequest);
    } catch (error) {
      if (error instanceof EmailAlreadyExistsError || error instanceof NonexistentRoleError) {
        return {
          statusCode: 403,
          data: new ForbiddenError(),
        };
      }

      return {
        statusCode: 500,
        data: new ServerError(error instanceof Error ? error : undefined),
      };
    }
  }
}
