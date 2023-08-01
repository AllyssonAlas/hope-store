import { Order } from '@/domain/entities';

describe('Order', () => {
  let orderData: any;

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
});
