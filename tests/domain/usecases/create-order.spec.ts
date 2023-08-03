import { mock, MockProxy } from 'jest-mock-extended';

import { Order } from '@/domain/entities';
import { setupCreateOrder, CreateOrder } from '@/domain/usecases';
import { LoadProductsListRepository, SaveOrderRepository } from '@/domain/contracts/repositories';
import { PostalCodeApi } from '@/domain/contracts/gateways';
import { ProductNotFoundError, InsufficientProductAmountError, InvalidAddressError } from '@/domain/errors';

jest.mock('@/domain/entities/order');

describe('CreateProduct', () => {
  let sut: CreateOrder;
  let productRepository: MockProxy<LoadProductsListRepository>;
  let postalCodeApi: MockProxy<PostalCodeApi>;
  let orderRepository: MockProxy<SaveOrderRepository>;
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
    postalCodeApi = mock();
    postalCodeApi.getAddress.mockResolvedValue({
      street: 'any_street_name',
      neighborhood: 'any_neighborhood_name',
      city: 'any_city_name',
      postalCode: 'any_postalCode_name',
    });
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
    orderRepository = mock();
  });

  beforeEach(() => {
    sut = setupCreateOrder(productRepository, postalCodeApi, orderRepository);
  });

  it('Should call LoadProductsListRepository with correct input', async () => {
    await sut(input);

    expect(productRepository.loadList).toHaveBeenCalledWith({ ids: ['any_product_id_1', 'any_product_id_2'] });
    expect(productRepository.loadList).toHaveBeenCalledTimes(1);
  });

  it('Should throw ProductNotFoundError if Order findInvalidProductId returns a product id', async () => {
    jest.spyOn(Order.prototype, 'findInvalidProductId').mockReturnValueOnce('any_product_id_1');

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new ProductNotFoundError('any_product_id_1'));
  });

  it('Should throw InsufficientProductAmountError if Order findUnavailableAmount returns a product', async () => {
    jest.spyOn(Order.prototype, 'findUnavailableAmount').mockReturnValueOnce({
      id: 'any_product_id_1',
      description: 'any_product_description',
      name: 'any_product_name',
      price: 10,
      quantity: 2,
    });

    const promise = sut({ ...input, products: [{ id: 'any_product_id_1', quantity: 99 }] });

    await expect(promise).rejects.toThrow(new InsufficientProductAmountError('any_product_id_1', 2));
  });

  it('Should rethrow if LoadProductsListRepository throws', async () => {
    productRepository.loadList.mockRejectedValueOnce(new Error('load_products_list_repository_error'));

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new Error('load_products_list_repository_error'));
  });

  it('Should call PostalCodeApi with correct input', async () => {
    await sut(input);

    expect(postalCodeApi.getAddress).toHaveBeenCalledWith({
      postalCode: 'any_postalCode_name',
    });
    expect(postalCodeApi.getAddress).toHaveBeenCalledTimes(1);
  });

  it('Should return InvalidAddressError if PostalCodeApi returns null', async () => {
    postalCodeApi.getAddress.mockResolvedValueOnce(null);

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new InvalidAddressError());
  });

  it('Should call SaveOrderRespository with correct input', async () => {
    await sut(input);

    expect(orderRepository.save).toHaveBeenCalledWith(jest.mocked(Order).mock.instances[0]);
    expect(orderRepository.save).toHaveBeenCalledTimes(1);
  });

  it('Should rethrow if SaveOrderRespository throws', async () => {
    orderRepository.save.mockRejectedValueOnce(new Error('save_order_repository_error'));

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new Error('save_order_repository_error'));
  });
});
