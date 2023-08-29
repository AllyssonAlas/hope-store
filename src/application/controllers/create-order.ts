import { ValidationBuilder as Builder, Validator } from '@/application/validation';

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

export class CreateOrderController {
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
