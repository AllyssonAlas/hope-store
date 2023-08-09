import { mock, MockProxy } from 'jest-mock-extended';

import { PostalCodeApi, AxiosHttpClient } from '@/infra/gateways';

describe('PostalCodeApi', () => {
  let sut: PostalCodeApi;
  let httpClient: MockProxy<AxiosHttpClient>;
  let postalCode: string;

  beforeAll(() => {
    httpClient = mock();
    httpClient.get.mockResolvedValue({
      cep: 'any_postal_code',
      city: 'any_city',
      neighborhood: 'any_neighborhood',
      street: 'any_street',
    });
  });

  beforeEach(() => {
    sut = new PostalCodeApi(httpClient);
  });

  it('Should call HttpClient get with correct input', async () => {
    await sut.getAddress({ postalCode });

    expect(httpClient.get).toHaveBeenCalledWith({
      url: `https://brasilapi.com.br/api/cep/v2/${postalCode}`,
    });
  });

  it('Should throw if HttpClient throws', async () => {
    httpClient.get.mockRejectedValueOnce(new Error('http_client_error'));

    const promise = sut.getAddress({ postalCode });

    await expect(promise).rejects.toThrow(new Error('http_client_error'));
  });
});
