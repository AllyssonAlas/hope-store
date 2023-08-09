import { PostalCodeApi as PostalCode } from '@/domain/contracts/gateways';
import { HttpGetClient } from '@/infra/contracts/gateways';

type ApiAddress = {
  cep: string;
  city: string;
  neighborhood: string;
  street: string;
}

export class PostalCodeApi {
  private readonly baseUrl = 'https://brasilapi.com.br/api/cep/v2/';

  constructor(private readonly httpClient: HttpGetClient) {}

  async getAddress({ postalCode }: PostalCode.Input): Promise<void> {
    await this.httpClient.get<ApiAddress>({ url: this.baseUrl + postalCode });
  }
}
