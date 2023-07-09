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
  let createProduct: jest.Mock;
  let request: {
    name: string;
    description: string;
    price: number;
    quantity: number;
  };

  beforeAll(() => {
    createProduct = jest.fn();
    request = {
      name: 'any_product_name',
      description: 'any_product_description',
      price: 10.5,
      quantity: 50,
    };
  });

  beforeEach(() => {
    sut = new CreateProductController(createProduct);
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

  it('Should call CreateUser with correct input', async () => {
    await sut.perform(request);

    expect(createProduct).toHaveBeenCalledWith({
      name: 'any_product_name',
      description: 'any_product_description',
      price: 10.5,
      quantity: 50,
    });
    expect(createProduct).toHaveBeenCalledTimes(1);
  });
});
