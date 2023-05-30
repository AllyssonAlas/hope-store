import { LoadUserRepository } from '@/domain/contracts/repositories';
import { InvalidCredentialsError } from '@/domain/errors';

type Input = { email: string, password: string }
export type Authentication = (input: Input) => Promise<void>
type Setup = (userRepo: LoadUserRepository) => Authentication

export const setupAuthentication: Setup = (userRepo) => {
  return async ({ email }) => {
    const user = await userRepo.load({ email });
    if (!user) {
      throw new InvalidCredentialsError();
    }
  };
};
