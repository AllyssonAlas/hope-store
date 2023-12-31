import { mock, MockProxy } from 'jest-mock-extended';
import { AxiosError } from 'axios';

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

  it('Should return null if httpClient get fails', async () => {
    const mockAxiosError = new AxiosError('any_axios_error');
    mockAxiosError.status = 400;

    httpClient.get.mockRejectedValueOnce(mockAxiosError);

    const result = await sut.getAddress({ postalCode });

    expect(result).toBeNull();
  });

  it('Should return correct data on success', async () => {
    const result = await sut.getAddress({ postalCode });

    expect(result).toEqual({
      postalCode: 'any_postal_code',
      city: 'any_city',
      neighborhood: 'any_neighborhood',
      street: 'any_street',
    });
  });
});
