import { LoadUserRepository, SaveUserRepository } from '@/domain/contracts/repositories';
import { HasherGenerator } from '@/domain/contracts/gateways';
import { UserAlreadyExistsError } from '@/domain/errors';

type Setup = (userRepo: LoadUserRepository & SaveUserRepository, hasher: HasherGenerator) => CreateUser
export type CreateUser = (input: Input) => Promise<void>
type Input = { name: string, email: string, cpf: string, password: string, role: string }

export const setupCreateUser: Setup = (userRepo, hasher) => async (input) => {
  const user = await userRepo.load({ email: input.email });
  if (user) {
    throw new UserAlreadyExistsError();
  }
  const { ciphertext } = await hasher.generate({ plaintext: input.password });
  await userRepo.save({
    cpf: input.cpf,
    name: input.name,
    password: ciphertext,
    email: input.email,
    role: input.role,
  });
};
