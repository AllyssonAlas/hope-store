import { mock, MockProxy } from 'jest-mock-extended';

import { setupCreateOrder, CreateOrder } from '@/domain/usecases';
import { LoadProductsListRepository } from '@/domain/contracts/repositories';

describe('CreateProduct', () => {
  let sut: CreateOrder;
  let productRepository: MockProxy<LoadProductsListRepository>;
  let input: {
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
    }
  };

  beforeAll(() => {
    productRepository = mock();
    input = {
      userId: 'any_user_id',
      products: [
        { id: 'any_product_id_1', quantity: 1 },
        { id: 'any_product_id_2', quantity: 5 },
      ],
      contact: 'any_contact_@gmail.com',
      address: {
        street: 'any_street_name',
        number: 'any_number_name',
        neighborhood: 'any_neighborhood_name',
        city: 'any_city_name',
        postalCode: 'any_postalCode_name',
      },
    };
  });

  beforeEach(() => {
    sut = setupCreateOrder(productRepository);
  });

  it('Should call LoadProductsListRepository with correct input', async () => {
    await sut(input);

    expect(productRepository.loadList).toHaveBeenCalledWith({ ids: ['any_product_id_1', 'any_product_id_2'] });
    expect(productRepository.loadList).toHaveBeenCalledTimes(1);
  });
});
