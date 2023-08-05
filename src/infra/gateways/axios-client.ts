import axios from 'axios';

import { HttpGetClient } from '@/infra/contracts/gateways';

export class AxiosHttpClient {
  async get<T = any>({ url, params }: HttpGetClient.Input): Promise<void> {
    await axios.get<T>(url, { params });
  }
}
