import { LoadUserRepository } from '@/domain/contracts/repositories';
import { HasherComparer } from '@/domain/contracts/gateways';
import { InvalidCredentialsError } from '@/domain/errors';

type Input = { email: string, password: string }
export type Authentication = (input: Input) => Promise<void>
type Setup = (userRepo: LoadUserRepository, hasher: HasherComparer) => Authentication

export const setupAuthentication: Setup = (userRepo, hasher) => {
  return async ({ email, password }) => {
    const user = await userRepo.load({ email });
    if (!user) {
      throw new InvalidCredentialsError();
    }
    const { isValid } = await hasher.compare({ plaintext: password, digest: user.password });
    if (!isValid) {
      throw new InvalidCredentialsError();
    }
  };
};
