import { AuthToken } from '@/domain/entities';
import { LoadUserRepository, LoadRoleRepository } from '@/domain/contracts/repositories';
import { HasherComparer, JwtTokenGenerator } from '@/domain/contracts/gateways';
import { InvalidCredentialsError } from '@/domain/errors';

type Input = { email: string, password: string }
export type Authentication = (input: Input) => Promise<void>
type Setup = (
  userRepo: LoadUserRepository,
  hasher: HasherComparer,
  roleRepo: LoadRoleRepository,
  authToken: JwtTokenGenerator
) => Authentication

export const setupAuthentication: Setup = (userRepo, hasher, roleRepo, authToken) => {
  return async ({ email, password }) => {
    const user = await userRepo.load({ email });
    if (!user) {
      throw new InvalidCredentialsError();
    }
    const { isValid } = await hasher.compare({ plaintext: password, digest: user.password });
    if (!isValid) {
      throw new InvalidCredentialsError();
    }
    const role = await roleRepo.load({ name: user.role });
    if (role) {
      await authToken.generate({
        id: user.id,
        role: role?.name,
        permissions: role?.permissions,
        expirationInMs: AuthToken.expirationInMs,
      });
    }
  };
};
