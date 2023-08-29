import { CreateOrderController } from '@/application/controllers';
import {
  RequiredStringValidator,
  RequiredArrayValidator,
  RequiredEmailValidator,
} from '@/application/validation';
import { InvalidAddressError } from '@/domain/errors';

describe('CreateOrderController', () => {
  let sut: CreateOrderController;
  let createOrder: jest.Mock;
  let request: {
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
      state: string
      postalCode: string
    }
  };

  beforeAll(() => {
    createOrder = jest.fn();
    request = {
      userId: 'any_user_id',
      products: [
        { id: 'any_product_id_1', quantity: 1 },
        { id: 'any_product_id_2', quantity: 5 },
      ],
      contact: 'any_contact_@gmail.com',
      address: {
        number: 'any_number',
        street: 'any_street',
        neighborhood: 'any_neighborhood',
        city: 'any_city',
        postalCode: 'any_postal_code',
        state: 'any_state',
      },
    };
  });

  beforeEach(() => {
    sut = new CreateOrderController(createOrder);
  });

  it('Should build validators correctly', () => {
    const validators = sut.buildValidators(request);

    expect(validators).toEqual([
      new RequiredStringValidator(request.userId, 'userId'),
      new RequiredArrayValidator(request.products, 'products'),
      new RequiredStringValidator(request.contact, 'contact'),
      new RequiredEmailValidator(request.contact, 'contact'),
      new RequiredStringValidator(request.address.number, 'number'),
      new RequiredStringValidator(request.address.street, 'street'),
      new RequiredStringValidator(request.address.neighborhood, 'neighborhood'),
      new RequiredStringValidator(request.address.city, 'city'),
      new RequiredStringValidator(request.address.state, 'state'),
      new RequiredStringValidator(request.address.postalCode, 'postalCode'),
    ]);
  });

  it('Should call CreateOrder with correct input', async () => {
    await sut.handle(request);

    expect(createOrder).toHaveBeenCalledWith({
      userId: 'any_user_id',
      products: [
        { id: 'any_product_id_1', quantity: 1 },
        { id: 'any_product_id_2', quantity: 5 },
      ],
      contact: 'any_contact_@gmail.com',
      address: {
        number: 'any_number',
        street: 'any_street',
        neighborhood: 'any_neighborhood',
        city: 'any_city',
        postalCode: 'any_postal_code',
        state: 'any_state',
      },
    });
    expect(createOrder).toHaveBeenCalledTimes(1);
  });

  it('Should return 400 if CreateOrder throws an error', async () => {
    createOrder.mockRejectedValueOnce(new InvalidAddressError());

    const response = await sut.handle(request);

    expect(response).toEqual({ data: new InvalidAddressError(), statusCode: 400 });
  });
});
