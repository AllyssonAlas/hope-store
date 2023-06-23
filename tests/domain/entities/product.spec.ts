import { Product } from '@/domain/entities';

describe('Product', () => {
  it('Should create a product', () => {
    const userData = {
      name: 'any_product_name',
      description: 'any_product_description',
      price: 1,
      quantity: 1,
      created_by: 'any_user_id',
    };

    const sut = new Product(userData);

    expect(sut).toEqual({
      name: 'any_product_name',
      description: 'any_product_description',
      price: 1,
      quantity: 1,
      created_by: 'any_user_id',
    });
  });
});
