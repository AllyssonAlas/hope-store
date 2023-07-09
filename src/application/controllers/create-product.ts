import { CreateProduct } from '@/domain/usecases';
import { ValidationBuilder as Builder, Validator } from '@/application/validation';

type HttpRequest = {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export class CreateProductController {
  constructor(private readonly createProduct: CreateProduct) {}

  async perform(httpRequest: HttpRequest):Promise<void> {
    await this.createProduct(httpRequest);
  }

  buildValidators({ name, description, price, quantity }: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: name, fieldName: 'name' }).required('string').build(),
      ...Builder.of({ value: description, fieldName: 'description' }).required('string').minLength(10).build(),
      ...Builder.of({ value: price, fieldName: 'price' }).required('number').build(),
      ...Builder.of({ value: quantity, fieldName: 'quantity' }).required('integer').miValue(1).build(),
    ];
  }
}
