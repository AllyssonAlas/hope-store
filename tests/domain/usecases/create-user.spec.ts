import { mock, MockProxy } from 'jest-mock-extended';

import { User } from '@/domain/entities';
import { setupCreateUser, CreateUser } from '@/domain/usecases';
import { LoadUserRepository, SaveUserRepository, LoadRoleRepository } from '@/domain/contracts/repositories';
import { HasherGenerator } from '@/domain/contracts/gateways';
import { EmailAlreadyExistsError, NonexistentRoleError } from '@/domain/errors';

jest.mock('@/domain/entities/user');

describe('CreateUser', () => {
  let sut: CreateUser;
  let userRepository: MockProxy<LoadUserRepository & SaveUserRepository>;
  let roleRepository: MockProxy<LoadRoleRepository>;
  let hasherGenerator: MockProxy<HasherGenerator>;
  let input: {
    name: string;
    email: string;
    password: string;
    role: string;
  };

  beforeAll(() => {
    userRepository = mock();
    userRepository.load.mockResolvedValue(null);
    roleRepository = mock();
    roleRepository.load.mockResolvedValue({
      id: 'any_role_id',
      name: 'any_role_name',
      permissions: ['any_permission'],
    });
    hasherGenerator = mock();
    hasherGenerator.generate.mockResolvedValue({ ciphertext: 'any_hashed_password' });
    input = {
      name: 'any_user_name',
      email: 'any_user_email',
      password: 'any_user_password',
      role: 'any_role',
    };
  });

  beforeEach(() => {
    sut = setupCreateUser(userRepository, roleRepository, hasherGenerator);
  });

  it('Should call LoadUserRepository with correct input', async () => {
    await sut(input);

    expect(userRepository.load).toHaveBeenCalledWith({ email: 'any_user_email' });
    expect(userRepository.load).toHaveBeenCalledTimes(1);
  });

  it('should rethrow if LoadUserRepository throws', async () => {
    userRepository.load.mockRejectedValueOnce(new Error('load_user_repository_error'));

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new Error('load_user_repository_error'));
  });

  it('Should throw EmailAlreadyExistsError when LoadUserRepository returns an user', async () => {
    userRepository.load.mockResolvedValueOnce({
      id: 'any_user_id',
      name: 'any_user_name',
      email: 'any_user_email',
      password: 'any_user_password',
      role: 'any_user_role',
    });

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new EmailAlreadyExistsError());
  });

  it('Should call HashGenerator with correct input', async () => {
    await sut(input);

    expect(hasherGenerator.generate).toHaveBeenCalledWith({ plaintext: 'any_user_password' });
    expect(hasherGenerator.generate).toHaveBeenCalledTimes(1);
  });

  it('Should rethrow if HashGenerator throws', async () => {
    hasherGenerator.generate.mockRejectedValueOnce(new Error('hasher_generator_error'));

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new Error('hasher_generator_error'));
  });

  it('Should call LoadRoleRepository with correct input', async () => {
    await sut(input);

    expect(roleRepository.load).toHaveBeenCalledWith({ name: 'any_role' });
    expect(roleRepository.load).toHaveBeenCalledTimes(1);
  });

  it('Should rethrow if LoadRoleRepository throws', async () => {
    roleRepository.load.mockRejectedValueOnce(new Error('load_role_repository_error'));

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new Error('load_role_repository_error'));
  });

  it('Should throw NonexistentRoleError if LoadRoleRepository returns undefined', async () => {
    roleRepository.load.mockResolvedValueOnce(null);

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new NonexistentRoleError());
  });

  it('Should call SaveUserRepository with correct input', async () => {
    await sut(input);

    expect(userRepository.save).toHaveBeenCalledWith(jest.mocked(User).mock.instances[0]);
    expect(userRepository.save).toHaveBeenCalledTimes(1);
  });

  it('Should rethrow if SaveUserRepository throws', async () => {
    userRepository.save.mockRejectedValueOnce(new Error('save_user_repository_error'));

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new Error('save_user_repository_error'));
  });
});
