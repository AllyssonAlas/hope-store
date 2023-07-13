
import { JwtTokenValidator } from '@/domain/contracts/gateways';
import { InvalidTokenError, RequiredPermissionError } from '@/domain/errors';

type Input = { token: string; requiredPermission: string; }
type Output = { userId: string; }
export type Authorization = (input: Input) => Promise<Output>
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
    return { userId: tokenData.id };
  };
};
