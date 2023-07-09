import { CreateProductController } from '@/application/controllers';
import {
  RequiredStringValidator,
  RequiredMinLengthValidator,
  RequiredNumberValidator,
  RequiredMinValueValidator,
  RequiredIntegerValidator,
} from '@/application/validation';

describe('CreateUserController', () => {
  let sut: CreateProductController;
  let request: {
    name: string;
    description: string;
    price: number;
    quantity: number;
  };

  beforeAll(() => {
    request = {
      name: 'any_product_name',
      description: 'any_product_description',
      price: 10.5,
      quantity: 50,
    };
  });

  beforeEach(() => {
    sut = new CreateProductController();
  });

  it('Should build validators correctly', () => {
    const validators = sut.buildValidators(request);

    expect(validators).toEqual([
      new RequiredStringValidator(request.name, 'name'),
      new RequiredStringValidator(request.description, 'description'),
      new RequiredMinLengthValidator(10, request.description, 'description'),
      new RequiredNumberValidator(request.price, 'price'),
      new RequiredIntegerValidator(request.quantity, 'quantity'),
      new RequiredMinValueValidator(1, request.quantity, 'quantity'),
    ]);
  });
});
