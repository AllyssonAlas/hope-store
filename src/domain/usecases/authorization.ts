
import { JwtTokenValidator } from '@/domain/contracts/gateways';
import { InvalidTokenError } from '@/domain/errors';

type Input = {
  token: string
}
export type Authorization = (input: Input) => Promise<void>
type Setup = (tokenValidator: JwtTokenValidator) => Authorization

export const setupAuthorization: Setup = (tokenValidator) => {
  return async (input) => {
    const tokenData = await tokenValidator.validate(input);
    if (!tokenData) {
      throw new InvalidTokenError();
    }
  };
};
