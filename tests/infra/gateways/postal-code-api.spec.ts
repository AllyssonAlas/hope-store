import { mock, MockProxy } from 'jest-mock-extended';

import { PostalCodeApi, AxiosHttpClient } from '@/infra/gateways';

describe('PostalCodeApi', () => {
  let sut: PostalCodeApi;
  let httpClient: MockProxy<AxiosHttpClient>;
  let postalCode: string;

  beforeAll(() => {
    httpClient = mock();
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
});
