import { LoadUserRepository } from '@/domain/contracts/repositories';
import { HasherGenerator } from '@/domain/contracts/gateways';
import { UserAlreadyExistsError } from '@/domain/errors';

type Setup = (loadUserRepo: LoadUserRepository, hasher: HasherGenerator) => CreateUser
export type CreateUser = (input: Input) => Promise<void>
type Input = { name: string, email: string, cpf: string, password: string, role: string }

export const setupCreateUser: Setup = (loadUserRepo, hasher) => async (input) => {
  const user = await loadUserRepo.load({ email: input.email });
  if (user) {
    throw new UserAlreadyExistsError();
  }
  await hasher.generate({ plaintext: input.password });
};
