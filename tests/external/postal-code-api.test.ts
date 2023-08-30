import { PostalCodeApi, AxiosHttpClient } from '@/infra/gateways';

describe('Postal Code Api Integration Tests', () => {
  let axiosClient: AxiosHttpClient;
  let sut: PostalCodeApi;

  beforeEach(() => {
    axiosClient = new AxiosHttpClient();
    sut = new PostalCodeApi(axiosClient);
  });

  it('Should return the correct address when postal code is valid', async () => {
    const address = await sut.getAddress({ postalCode: '11722170' });

    expect(address).toEqual({
      postalCode: '11722170',
      state: 'SP',
      city: 'Praia Grande',
      neighborhood: 'Vila Sônia',
      street: 'Rua Sérgio Gregório',
    });
  });

  it('Should return the correct null when postal code is invalid', async () => {
    const address = await sut.getAddress({ postalCode: '00000000' });

    expect(address).toBeNull();
  });
});
