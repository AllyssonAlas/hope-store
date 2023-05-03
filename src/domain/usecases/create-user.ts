import { User } from '@/domain/entities';
import {
  LoadUserRepository,
  SaveUserRepository,
  LoadRoleRepository,
} from '@/domain/contracts/repositories';
import { HasherGenerator } from '@/domain/contracts/gateways';
import { EmailAlreadyExistsError, NonexistentRoleError } from '@/domain/errors';

type Setup = (userRepo: LoadUserRepository & SaveUserRepository, roleRepo: LoadRoleRepository, hasher: HasherGenerator) => CreateUser
export type CreateUser = (input: Input) => Promise<void>
type Input = { name: string, email: string, password: string, role: string }

export const setupCreateUser: Setup = (userRepo, roleRepo, hasher) => {
  return async ({ email, role, password, ...inputData }) => {
    const user = await userRepo.load({ email });
    if (user) {
      throw new EmailAlreadyExistsError();
    }
    const roleData = await roleRepo.load({ name: role });
    if (!roleData) {
      throw new NonexistentRoleError();
    }
    const { ciphertext } = await hasher.generate({ plaintext: password });
    const userData = new User({ ...inputData, roleId: roleData.id, password: ciphertext, email });
    await userRepo.save(userData);
  };
};
