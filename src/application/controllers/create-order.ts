import { CreateOrder } from '@/domain/usecases';
import { Controller } from '@/application/controllers';
import { ValidationBuilder as Builder, Validator } from '@/application/validation';
import { HttpResponse, badRequest, ok } from '@/application/helpers';

type HttpRequest = {
  userId: string
  products: Array<{
    id: string
    quantity: number
  }>
  contact: string
  address: {
    street: string
    number: string
    neighborhood: string
    city: string
    postalCode: string
    state: string
  }
}

type Model = {
  products: Array<{
    id: string
    quantity: number
  }>
  status: string
  value: number
} | Error ;

export class CreateOrderController extends Controller {
  constructor(private readonly createOrder: CreateOrder) {
    super();
  }

  async perform(httpRequest: HttpRequest):Promise<HttpResponse<Model>> {
    const result = await this.createOrder(httpRequest);
    if (result instanceof Error) {
      return badRequest(result);
    }
    return ok(result);
  }

  buildValidators({ userId, products, contact, address }: HttpRequest): Validator[] {
    const { number, street, neighborhood, city, state, postalCode } = address;
    return [
      ...Builder.of({ value: userId, fieldName: 'userId' }).required('string').build(),
      ...Builder.of({ value: products, fieldName: 'products' }).required('array').build(),
      ...Builder.of({ value: contact, fieldName: 'contact' }).required('string').email().build(),
      ...Builder.of({ value: number, fieldName: 'number' }).required('string').build(),
      ...Builder.of({ value: street, fieldName: 'street' }).required('string').build(),
      ...Builder.of({ value: neighborhood, fieldName: 'neighborhood' }).required('string').build(),
      ...Builder.of({ value: city, fieldName: 'city' }).required('string').build(),
      ...Builder.of({ value: state, fieldName: 'state' }).required('string').build(),
      ...Builder.of({ value: postalCode, fieldName: 'postalCode' }).required('string').build(),
    ];
  }
}
