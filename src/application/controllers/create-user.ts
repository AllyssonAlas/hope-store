import { CreateUser } from '@/domain/usecases';
import { EmailAlreadyExistsError, NonexistentRoleError } from '@/domain/errors';
import { HttpResponse, badRequest, forbidden, serverError, noContent } from '@/application/helpers';
import { RequiredStringValidator, RequiredEmailValidator, ValidationComposite } from '@/application/validation';

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
    return new ValidationComposite([
      new RequiredStringValidator(httpRequest.name, 'name'),
      new RequiredStringValidator(httpRequest.email, 'email'),
      new RequiredStringValidator(httpRequest.password, 'email'),
      new RequiredStringValidator(httpRequest.role, 'role'),
      new RequiredEmailValidator(httpRequest.email, 'email'),
    ]).validate();
  }
}
