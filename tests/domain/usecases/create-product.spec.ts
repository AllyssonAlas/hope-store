import { mock, MockProxy } from 'jest-mock-extended';

import { setupCreateProduct, CreateProduct } from '@/domain/usecases';
import { CreateProductRepository } from '@/domain/contracts/repositories';

describe('CreateProduct', () => {
  let product: any;
  let productRepository: MockProxy<CreateProductRepository>;
  let sut: CreateProduct;

  beforeAll(() => {
    product = {
      name: 'any_product_name',
      description: 'any_product_description',
      price: 10,
      quantity: 2,
      createdBy: 'any_user_id',
    };
    productRepository = mock();
  });

  beforeEach(() => {
    sut = setupCreateProduct(productRepository);
  });

  it('Should call ProductRepository with correct input', async () => {
    await sut(product);

    expect(productRepository.create).toHaveBeenCalledWith({
      name: 'any_product_name',
      description: 'any_product_description',
      price: 10,
      quantity: 2,
      createdBy: 'any_user_id',
    });
    expect(productRepository.create).toHaveBeenCalledTimes(1);
  });

  it('Should rethrow if LoadUserRepository throws', async () => {
    productRepository.create.mockRejectedValueOnce(new Error('create_product_repository_error'));

    const promise = sut(product);

    await expect(promise).rejects.toThrow(new Error('create_product_repository_error'));
  });
});
