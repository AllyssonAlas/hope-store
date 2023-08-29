import { CreateOrderController } from '@/application/controllers';
import {
  RequiredStringValidator,
  RequiredArrayValidator,
  RequiredEmailValidator,
} from '@/application/validation';

describe('CreateOrderController', () => {
  let sut: CreateOrderController;
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
    sut = new CreateOrderController();
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
});
