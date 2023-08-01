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

  it('Should create an order', () => {
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
    const sut = new Order({ ...orderData });

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

  it('Should return an unavailable product', () => {
    const unavailableRequest = [{ id: 'any_product_id_1', quantity: 100 }];

    const sut = new Order({ ...orderData, products: unavailableRequest }).checkUnavailableProduct(products);

    expect(sut).toMatchObject({ id: 'any_product_id_1', quantity: 99 });
  });

  it('Should return an null', () => {
    const sut = new Order({ ...orderData }).checkUnavailableProduct(products);

    expect(sut).toBeNull();
  });
});
