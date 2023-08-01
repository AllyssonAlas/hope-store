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

  it('Should create a product with an id', () => {
    const productData = {
      id: 'any_product_id',
      name: 'any_product_name',
      description: 'any_product_description',
      price: 1,
      quantity: 1,
    };

    const sut = new Product(productData);

    expect(sut).toEqual({
      id: 'any_product_id',
      name: 'any_product_name',
      description: 'any_product_description',
      price: 1,
      quantity: 1,
    });
  });
});
