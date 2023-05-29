import { LoadUserRepository } from '@/domain/contracts/repositories';

type Input = {email: string, password: string}
export type Authentication = (input: Input) => Promise<void>
type Setup = (userRepository: LoadUserRepository) => Authentication

export const setupAuthentication: Setup = (userRepository) => {
  return async ({ email }) => {
    await userRepository.load({ email });
  };
};
