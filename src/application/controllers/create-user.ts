import { CreateUser } from '@/domain/usecases';
import { HttpResponse } from '@/application/helpers';

export class CreateUserController {
  constructor(private readonly createUser: CreateUser) {}

  async handle(httpRequest: any):Promise<HttpResponse | any> {
    const fields = ['name', 'email', 'password', 'role'];
    for (const field of fields) {
      if (!Object.keys(httpRequest).includes(field)) {
        return {
          data: new Error(`Field ${field} is required`),
          statusCode: 400,
        };
      }
    }
    if (!(/^[\w.]+@\w+.\w{2,}(?:.\w{2})?$/gmi).test(httpRequest.email)) {
      return {
        data: new Error('Field email is not valid'),
        statusCode: 400,
      };
    }
    await this.createUser(httpRequest);
  }
}
