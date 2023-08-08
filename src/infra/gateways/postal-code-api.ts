import { PostalCodeApi as PostalCode } from '@/domain/contracts/gateways';
import { HttpGetClient } from '@/infra/contracts/gateways';

export class PostalCodeApi {
  constructor(private readonly httpClient: HttpGetClient) {}

  async getAddress({ postalCode }: PostalCode.Input): Promise<void> {
    await this.httpClient.get({ url: `https://brasilapi.com.br/api/cep/v2/${postalCode}` });
  }
}
