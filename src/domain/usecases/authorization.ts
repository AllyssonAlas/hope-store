
import { JwtTokenValidator } from '@/domain/contracts/gateways';
import { InvalidTokenError, RequiredPermissionError } from '@/domain/errors';

type Input = {
  token: string;
  requiredPermission: string
}
export type Authorization = (input: Input) => Promise<void>
type Setup = (tokenValidator: JwtTokenValidator) => Authorization

export const setupAuthorization: Setup = (tokenValidator) => {
  return async ({ token, requiredPermission }) => {
    const tokenData = await tokenValidator.validate({ token });
    if (!tokenData) {
      throw new InvalidTokenError();
    }
    if (!tokenData.permissions.includes(requiredPermission)) {
      throw new RequiredPermissionError();
    }
  };
};
