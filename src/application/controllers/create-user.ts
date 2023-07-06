import { CreateUser, Authentication } from '@/domain/usecases';
import { HttpResponse, forbidden, ok } from '@/application/helpers';
import { ValidationBuilder as Builder, Validator } from '@/application/validation';
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
      ...Builder.of({ value: httpRequest.name, fieldName: 'name' }).required('string').build(),
      ...Builder.of({ value: httpRequest.email, fieldName: 'email' }).required('string').email().build(),
      ...Builder.of({ value: httpRequest.password, fieldName: 'password' }).required('string').build(),
      ...Builder.of({ value: httpRequest.role, fieldName: 'role' }).required('string').build(),
    ];
  }
}
