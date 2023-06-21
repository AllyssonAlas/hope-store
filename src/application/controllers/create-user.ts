import { CreateUser, Authentication } from '@/domain/usecases';
import { HttpResponse, forbidden, ok } from '@/application/helpers';
import { RequiredStringValidator, RequiredEmailValidator, Validator } from '@/application/validation';
import { Controller } from '@/application/controllers';

type HttpRequest = {
  name: string;
  email: string;
  password: string;
  role: string;
}

type Model = {
  authToken: string
  email: string
  name: string
} | Error ;

export class CreateUserController extends Controller {
  constructor(
    private readonly createUser: CreateUser,
    private readonly authentication: Authentication,
  ) {
    super();
  }

  async perform(httpRequest: HttpRequest):Promise<HttpResponse<Model>> {
    try {
      const { email, password } = httpRequest;
      await this.createUser(httpRequest);
      const user = await this.authentication({ email, password });
      return ok(user);
    } catch (error) {
      return forbidden();
    }
  }

  override buildValidators(httpRequest: HttpRequest): Validator[] {
    return [
      new RequiredStringValidator(httpRequest.name, 'name'),
      new RequiredStringValidator(httpRequest.email, 'email'),
      new RequiredStringValidator(httpRequest.password, 'password'),
      new RequiredStringValidator(httpRequest.role, 'role'),
      new RequiredEmailValidator(httpRequest.email, 'email'),
    ];
  }
}
