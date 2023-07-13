
import { JwtTokenValidator } from '@/domain/contracts/gateways';

type Input = {
  token: string
}
export type Authorization = (input: Input) => Promise<void>
type Setup = (tokenValidator: JwtTokenValidator) => Authorization

export const setupAuthorization: Setup = (tokenValidator) => {
  return async (input) => {
    await tokenValidator.validate(input);
  };
};
