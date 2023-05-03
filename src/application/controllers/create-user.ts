import { CreateUser } from '@/domain/usecases';
import { HttpResponse, forbidden, noContent } from '@/application/helpers';
import { RequiredStringValidator, RequiredEmailValidator, Validator } from '@/application/validation';
import { Controller } from '@/application/controllers';

type HttpRequest = {
  name: string;
  email: string;
  password: string;
  role: string;
}

type Model = Error | null;

export class CreateUserController extends Controller {
  constructor(private readonly createUser: CreateUser) {
    super();
  }

  async perform(httpRequest: HttpRequest):Promise<HttpResponse<Model>> {
    try {
      await this.createUser(httpRequest);
      return noContent();
    } catch (error) {
      return forbidden();
    }
  }

  override buildValidators(httpRequest: HttpRequest): Validator[] {
    return [
      new RequiredStringValidator(httpRequest.name, 'name'),
      new RequiredStringValidator(httpRequest.email, 'email'),
      new RequiredStringValidator(httpRequest.password, 'email'),
      new RequiredStringValidator(httpRequest.role, 'role'),
      new RequiredEmailValidator(httpRequest.email, 'email'),
    ];
  }
}
