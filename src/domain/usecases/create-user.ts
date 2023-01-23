import { LoadUserRepository } from '@/domain/contracts/repositories';
import { UserAlreadyExistsError } from '@/domain/errors';

type Setup = (loadUserRepo: LoadUserRepository) => CreateUser
type Input = { name: string, email: string, cpf: string, password: string, role: string }
export type CreateUser = (input: Input) => Promise<void>

export const setupCreateUser: Setup = (loadUserRepo) => async (input) => {
  const user = await loadUserRepo.load({ email: input.email });
  if (user) {
    throw new UserAlreadyExistsError();
  }
};
