import axios from 'axios';

import { HttpGetClient } from '@/infra/contracts/gateways';

export class AxiosHttpClient implements HttpGetClient {
  async get<T = any>({ url, params }: HttpGetClient.Input): Promise<T> {
    const { data } = await axios.get<T>(url, { params });
    return data;
  }
}
