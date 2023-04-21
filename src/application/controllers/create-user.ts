import { HttpResponse } from '@/application/helpers';

export class CreateUserController {
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
  }
}
