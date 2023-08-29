import { PostalCodeApi } from '@/infra/gateways';
import { makeAxiosClient } from '@/main/factories/infra/gateways';

export const makePostalCodeApi = (): PostalCodeApi => {
  return new PostalCodeApi(makeAxiosClient());
};
