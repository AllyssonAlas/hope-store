import { mock, MockProxy } from 'jest-mock-extended';

import { setupCreateOrder, CreateOrder } from '@/domain/usecases';
import { LoadProductsListRepository } from '@/domain/contracts/repositories';
import { ProductNotFoundError, InsufficientProductAmountError } from '@/domain/errors';

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
    productRepository.loadList.mockResolvedValue([
      {
        id: 'any_product_id_1',
        description: 'any_product_description',
        name: 'any_product_name',
        price: 10,
        quantity: 2,
      },
      {
        id: 'any_product_id_2',
        description: 'any_product_description',
        name: 'any_product_name',
        price: 20,
        quantity: 10,
      },
    ]);
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

  it('Should throw ProductNotFoundError if product list length returned by LoadProductsListRepository is smaller than input products length ', async () => {
    productRepository.loadList.mockResolvedValueOnce([
      {
        id: 'any_product_id_2',
        description: 'any_product_description',
        name: 'any_product_name',
        price: 20,
        quantity: 4,
      },
    ]);

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new ProductNotFoundError('any_product_id_1'));
  });

  it('Should throw InsufficientProductAmountError if amount required is higher than returned by LoadProductsListRepository', async () => {
    try {
      await sut({ ...input, products: [{ id: 'any_product_id_1', quantity: 99 }] });
    } catch (error) {
      expect(error).toEqual(new InsufficientProductAmountError('any_product_id_1', 2));
    }
  });
});
