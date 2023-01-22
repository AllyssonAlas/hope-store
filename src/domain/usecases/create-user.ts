import { LoadUserRepository } from '@/domain/contracts/repositories';

type Setup = (loadUserRepo: LoadUserRepository) => CreateUser
type Input = { name: string, email: string, cpf: string, password: string, role: string }
type CreateUser = (input: Input) => Promise<void>

export const setupCreateUser: Setup = (loadUserRepo) => async (input) => {
  await loadUserRepo.load({ email: input.email });
};
