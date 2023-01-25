import { mock, MockProxy } from 'jest-mock-extended';

import { setupCreateUser, CreateUser } from '@/domain/usecases';
import { LoadUserRepository, SaveUserRepository, LoadRoleRepository } from '@/domain/contracts/repositories';
import { HasherGenerator } from '@/domain/contracts/gateways';
import { UserAlreadyExistsError, NonexistentRoleError } from '@/domain/errors';

describe('CreateUser', () => {
  let user: any;
  let hasherGenerator: MockProxy<HasherGenerator>;
  let userRepository: MockProxy<LoadUserRepository & SaveUserRepository>;
  let roleRepository: MockProxy<LoadRoleRepository>;
  let sut: CreateUser;

  beforeAll(() => {
    user = {
      name: 'any_user_name',
      email: 'any_user_email',
      cpf: 'any_user_cpf',
      password: 'any_user_password',
      role: 'any_user_role',
    };
    hasherGenerator = mock();
    userRepository = mock();
    roleRepository = mock();
    userRepository.load.mockResolvedValue(undefined);
    roleRepository.load.mockResolvedValue({ id: 'any_role_id', name: 'any_role_name' });
    hasherGenerator.generate.mockResolvedValue({ ciphertext: 'any_hashed_password' });
  });

  beforeEach(() => {
    sut = setupCreateUser(userRepository, roleRepository, hasherGenerator);
  });

  it('Should call LoadUserRepository with correct input', async () => {
    await sut(user);

    expect(userRepository.load).toHaveBeenCalledWith({ email: 'any_user_email' });
    expect(userRepository.load).toHaveBeenCalledTimes(1);
  });

  it('Should return a UserAlreadyExistsError when LoadUserRepository returns an user', async () => {
    userRepository.load.mockResolvedValueOnce({
      id: 'any_user_id',
      name: 'any_user_name',
      email: 'any_user_email',
      cpf: 'any_user_cpf',
      role: 'any_user_role',
    });

    const promise = sut(user);

    await expect(promise).rejects.toThrow(new UserAlreadyExistsError());
  });

  it('Should call HashGenerator with correct input', async () => {
    await sut(user);

    expect(hasherGenerator.generate).toHaveBeenCalledWith({ plaintext: 'any_user_password' });
    expect(hasherGenerator.generate).toHaveBeenCalledTimes(1);
  });

  it('Should call LoadRoleRepository with correct input', async () => {
    await sut(user);

    expect(roleRepository.load).toHaveBeenCalledWith({ name: 'any_user_role' });
    expect(roleRepository.load).toHaveBeenCalledTimes(1);
  });

  it('Should throw NonexistentRoleError if LoadRoleRepository returns undefined', async () => {
    roleRepository.load.mockResolvedValueOnce(undefined);

    const promise = sut(user);

    await expect(promise).rejects.toThrow(new NonexistentRoleError());
  });

  it('Should call SaveUserRepository with correct input', async () => {
    await sut(user);

    expect(userRepository.save).toHaveBeenCalledWith({
      name: 'any_user_name',
      email: 'any_user_email',
      cpf: 'any_user_cpf',
      password: 'any_hashed_password',
      role: 'any_user_role',
    });
    expect(userRepository.save).toHaveBeenCalledTimes(1);
  });
});
