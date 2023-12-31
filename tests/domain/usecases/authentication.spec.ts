import { mock, MockProxy } from 'jest-mock-extended';

import { setupAuthentication, Authentication } from '@/domain/usecases';
import { AuthToken } from '@/domain/entities';
import { LoadUserRepository, LoadRoleRepository } from '@/domain/contracts/repositories';
import { HasherComparer, JwtTokenGenerator } from '@/domain/contracts/gateways';
import { InvalidCredentialsError } from '@/domain/errors';

describe('Authentication', () => {
  let sut: Authentication;
  let userRepository: MockProxy<LoadUserRepository>;
  let hasherComparer: MockProxy<HasherComparer>;
  let roleRepository: MockProxy<LoadRoleRepository>;
  let authToken: MockProxy<JwtTokenGenerator>;
  let input: {
    email: string;
    password: string;
  };

  beforeAll(() => {
    userRepository = mock();
    userRepository.load.mockResolvedValue({
      id: 'any_user_id',
      name: 'any_user_name',
      email: 'any_user_email',
      password: 'any_hashed_password',
      role: 'any_user_role',
    });
    hasherComparer = mock();
    hasherComparer.compare.mockResolvedValue({ isValid: true });
    roleRepository = mock();
    roleRepository.load.mockResolvedValue({ id: 'any_role_id', name: 'any_role_name', permissions: ['any_permissions'] });
    authToken = mock();
    authToken.generate.mockResolvedValue({ token: 'any_token' });
    input = {
      email: 'any_user_email',
      password: 'any_user_password',
    };
  });

  beforeEach(() => {
    sut = setupAuthentication(userRepository, hasherComparer, roleRepository, authToken);
  });

  it('Should call LoadUserRepository with correct input', async () => {
    await sut(input);

    expect(userRepository.load).toHaveBeenCalledWith({ email: 'any_user_email' });
    expect(userRepository.load).toHaveBeenCalledTimes(1);
  });

  it('Should rethrow if LoadUserRepository throws', async () => {
    userRepository.load.mockRejectedValueOnce(new Error('load_user_repository_error'));

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new Error('load_user_repository_error'));
  });

  it('Should throw InvalidCredentialsError if LoadUserRepository returns null', async () => {
    userRepository.load.mockResolvedValueOnce(null);

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  it('Should call HasherComparer with correct input', async () => {
    await sut(input);

    expect(hasherComparer.compare).toHaveBeenCalledWith({
      plaintext: 'any_user_password',
      digest: 'any_hashed_password',
    });
    expect(hasherComparer.compare).toHaveBeenCalledTimes(1);
  });

  it('Should rethrow if HasherComparer throws', async () => {
    hasherComparer.compare.mockRejectedValueOnce(new Error('hasher_comparer_error'));

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new Error('hasher_comparer_error'));
  });

  it('Should throw InvalidCredentialsError if HasherComparer isValid false', async () => {
    hasherComparer.compare.mockResolvedValueOnce({ isValid: false });

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  it('Should call LoadRoleRepository with correct input', async () => {
    await sut(input);

    expect(roleRepository.load).toHaveBeenCalledWith({ name: 'any_user_role' });
    expect(roleRepository.load).toHaveBeenCalledTimes(1);
  });

  it('Should rethrow if LoadRoleRepository throws', async () => {
    roleRepository.load.mockRejectedValueOnce(new Error('role_repository_error'));

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new Error('role_repository_error'));
  });

  it('Should call JwtTokenGenerator with correct input', async () => {
    await sut(input);

    expect(authToken.generate).toHaveBeenCalledWith({
      id: 'any_user_id',
      role: 'any_role_name',
      permissions: ['any_permissions'],
      expirationInMs: AuthToken.expirationInMs,
    });
    expect(authToken.generate).toHaveBeenCalledTimes(1);
  });

  it('Should rethrow if JwtTokenGenerator throws', async () => {
    authToken.generate.mockRejectedValueOnce(new Error('jwt_token_generator_error'));

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new Error('jwt_token_generator_error'));
  });

  it('Should return correct output on success', async () => {
    const result = await sut(input);

    expect(result).toEqual({
      authToken: 'any_token',
      name: 'any_user_name',
      email: 'any_user_email',
    });
  });
});
