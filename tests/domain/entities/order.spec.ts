import { Order, Product } from '@/domain/entities';

describe('Order', () => {
  let orderData: any;
  let products: Product[];

  beforeAll(() => {
    orderData = {
      userId: 'any_user_id',
      products: [
        { id: 'any_product_id_1', quantity: 3 },
        { id: 'any_product_id_2', quantity: 5 },
      ],
      contact: 'any_contact@mail.com',
      address: {
        street: 'any_street_name',
        number: 'any_number_',
        neighborhood: 'any_neighborhood_name',
        city: 'any_city_name',
        postalCode: 'any_postal_code',
      },
      status: 'pending',
    };

    products = [
      {
        id: 'any_product_id_1',
        description: 'any_product_description',
        name: 'any_product_name',
        price: 20,
        quantity: 99,
      },
      {
        id: 'any_product_id_2',
        description: 'any_product_description',
        name: 'any_product_name',
        price: 1,
        quantity: 99,
      },
    ];
  });

  it('Should create an order with value', () => {
    const sut = new Order({ ...orderData, value: 50 });

    expect(sut).toEqual({
      userId: 'any_user_id',
      products: [
        { id: 'any_product_id_1', quantity: 3 },
        { id: 'any_product_id_2', quantity: 5 },
      ],
      contact: 'any_contact@mail.com',
      address: {
        street: 'any_street_name',
        number: 'any_number_',
        neighborhood: 'any_neighborhood_name',
        city: 'any_city_name',
        postalCode: 'any_postal_code',
      },
      status: 'pending',
      value: 50,
    });
  });

  it('Should create an order without value', () => {
    const sut = new Order(orderData);

    expect(sut).toEqual({
      userId: 'any_user_id',
      products: [
        { id: 'any_product_id_1', quantity: 3 },
        { id: 'any_product_id_2', quantity: 5 },
      ],
      contact: 'any_contact@mail.com',
      address: {
        street: 'any_street_name',
        number: 'any_number_',
        neighborhood: 'any_neighborhood_name',
        city: 'any_city_name',
        postalCode: 'any_postal_code',
      },
      status: 'pending',
      value: 0,
    });
  });

  it('Should create an order with method', () => {
    const sut = new Order(orderData);

    sut.calculateValue(products);

    expect(sut).toEqual({
      userId: 'any_user_id',
      products: [
        { id: 'any_product_id_1', quantity: 3 },
        { id: 'any_product_id_2', quantity: 5 },
      ],
      contact: 'any_contact@mail.com',
      address: {
        street: 'any_street_name',
        number: 'any_number_',
        neighborhood: 'any_neighborhood_name',
        city: 'any_city_name',
        postalCode: 'any_postal_code',
      },
      status: 'pending',
      value: 65,
    });
  });

  it('Should return a product if amount requested is higher than stored', () => {
    const invalidRequest = [{ id: 'any_product_id_1', quantity: 100 }];

    const sut = new Order({ ...orderData, products: invalidRequest }).findUnavailableAmount(products);

    expect(sut).toMatchObject({ id: 'any_product_id_1', quantity: 99 });
  });

  it('Should return null if any amount requested is not higher than stored', () => {
    const sut = new Order(orderData).findUnavailableAmount(products);

    expect(sut).toBeNull();
  });

  it('Should return an invalid product id not found inside products list', () => {
    const unavailableRequest = [{ id: 'any_product_id_3', quantity: 1 }];

    const sut = new Order({ ...orderData, products: unavailableRequest }).findInvalidProductId(products);

    expect(sut).toBe('any_product_id_3');
  });

  it('Should return undefined is all products were found inside products list', () => {
    const sut = new Order(orderData).findInvalidProductId(products);

    expect(sut).toBeUndefined();
  });
});
