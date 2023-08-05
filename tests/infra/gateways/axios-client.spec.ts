import axios from 'axios';

import { AxiosHttpClient } from '@/infra/gateways';

jest.mock('axios');

describe('AxiosHttpClient', () => {
  let sut: AxiosHttpClient;
  let fakeAxios: jest.Mocked<typeof axios>;
  let url: string;
  let params: object;

  beforeAll(() => {
    url = 'any_url';
    params = { any: 'any' };
    fakeAxios = axios as jest.Mocked<typeof axios>;
  });

  beforeEach(() => {
    sut = new AxiosHttpClient();
  });

  describe('get', () => {
    it('Should call get with correct params', async () => {
      await sut.get({ url, params });

      expect(fakeAxios.get).toHaveBeenCalledWith(url, { params });
      expect(fakeAxios.get).toHaveBeenCalledTimes(1);
    });
  });
});
