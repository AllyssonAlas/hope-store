import { PostalCode } from '@/domain/contracts/gateways';
import { HttpGetClient } from '@/infra/contracts/gateways';

type ApiAddress = {
  cep: string;
  city: string;
  neighborhood: string;
  street: string;
  state: string;
}

export class PostalCodeApi implements PostalCode {
  private readonly baseUrl = 'https://brasilapi.com.br/api/cep/v2/';

  constructor(private readonly httpClient: HttpGetClient) {}

  async getAddress({ postalCode }: PostalCode.Input): Promise<PostalCode.Output> {
    try {
      const response = await this.httpClient.get<ApiAddress>({ url: this.baseUrl + postalCode });
      return {
        city: response.city,
        neighborhood: response.neighborhood,
        postalCode: response.cep,
        street: response.street,
        state: response.state,
      };
    } catch (error) {
      return null;
    }
  }
}
