import { mock, MockProxy } from 'jest-mock-extended';

import { Product } from '@/domain/entities';
import { setupCreateProduct, CreateProduct } from '@/domain/usecases';
import { CreateProductRepository } from '@/domain/contracts/repositories';

jest.mock('@/domain/entities/product');

describe('CreateProduct', () => {
  let sut: CreateProduct;
  let productRepository: MockProxy<CreateProductRepository>;
  let input: {
    name: string;
    description: string;
    price: number;
    quantity: number;
  };

  beforeAll(() => {
    productRepository = mock();
    input = {
      name: 'any_product_name',
      description: 'any_product_description',
      price: 10,
      quantity: 2,
    };
  });

  beforeEach(() => {
    sut = setupCreateProduct(productRepository);
  });

  it('Should call CreateProductRepository with correct input', async () => {
    await sut(input);

    expect(productRepository.create).toHaveBeenCalledWith(jest.mocked(Product).mock.instances[0]);
    expect(productRepository.create).toHaveBeenCalledTimes(1);
  });

  it('Should rethrow if CreateProductRepository throws', async () => {
    productRepository.create.mockRejectedValueOnce(new Error('create_product_repository_error'));

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new Error('create_product_repository_error'));
  });
});
