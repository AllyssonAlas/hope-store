import { Product } from '@/domain/entities';

describe('Product', () => {
  it('Should create a product', () => {
    const productData = {
      name: 'any_product_name',
      description: 'any_product_description',
      price: 1,
      quantity: 1,
    };

    const sut = new Product(productData);

    expect(sut).toEqual({
      name: 'any_product_name',
      description: 'any_product_description',
      price: 1,
      quantity: 1,
    });
  });
});
