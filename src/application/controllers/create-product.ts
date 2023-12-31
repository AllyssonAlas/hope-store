import { CreateProduct } from '@/domain/usecases';
import { ValidationBuilder as Builder, Validator } from '@/application/validation';
import { HttpResponse, noContent } from '@/application/helpers';
import { Controller } from '@/application/controllers';

type HttpRequest = {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

type Model = null | Error ;

export class CreateProductController extends Controller {
  constructor(private readonly createProduct: CreateProduct) {
    super();
  }

  async perform(httpRequest: HttpRequest):Promise<HttpResponse<Model>> {
    await this.createProduct(httpRequest);
    return noContent();
  }

  buildValidators({ name, description, price, quantity }: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: name, fieldName: 'name' }).required('string').build(),
      ...Builder.of({ value: description, fieldName: 'description' }).required('string').minLength(10).build(),
      ...Builder.of({ value: price, fieldName: 'price' }).required('number').build(),
      ...Builder.of({ value: quantity, fieldName: 'quantity' }).required('integer').minValue(1).build(),
    ];
  }
}
