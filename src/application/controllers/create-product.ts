import { CreateProduct } from '@/domain/usecases';
import { ValidationBuilder as Builder, Validator } from '@/application/validation';
import { HttpResponse, noContent } from '@/application/helpers';

type HttpRequest = {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export class CreateProductController {
  constructor(private readonly createProduct: CreateProduct) {}

  async perform(httpRequest: HttpRequest):Promise<HttpResponse> {
    await this.createProduct(httpRequest);
    return noContent();
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
