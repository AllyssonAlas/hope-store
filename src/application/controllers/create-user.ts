import { CreateUser } from '@/domain/usecases';
import { EmailAlreadyExistsError, NonexistentRoleError } from '@/domain/errors';
import { HttpResponse, badRequest, forbidden, serverError, noContent } from '@/application/helpers';
import { RequiredStringValidator, RequiredEmailValidator } from '@/application/validation';

type HttpRequest = {
  name: string;
  email: string;
  password: string;
  role: string;
}

type Model = Error | null;

export class CreateUserController {
  constructor(private readonly createUser: CreateUser) {}

  async handle(httpRequest: HttpRequest):Promise<HttpResponse<Model>> {
    try {
      const error = this.validate(httpRequest);
      if (error) {
        return badRequest(error);
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

  private validate(httpRequest: HttpRequest): Error | undefined {
    const fields: ['name', 'email', 'password', 'role'] = ['name', 'email', 'password', 'role'];
    for (const field of fields) {
      const fieldMissingError = new RequiredStringValidator(httpRequest[field], field).validate();
      if (fieldMissingError) return fieldMissingError;
    }
    const invalidFieldError = new RequiredEmailValidator(httpRequest.email, 'email').validate();
    if (invalidFieldError) return invalidFieldError;
  }
}
