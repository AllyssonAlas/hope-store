import { mock, MockProxy } from 'jest-mock-extended';

import { setupAuthentication, Authentication } from '@/domain/usecases';
import { LoadUserRepository } from '@/domain/contracts/repositories';
import { HasherComparer } from '@/domain/contracts/gateways';
import { InvalidCredentialsError } from '@/domain/errors';

describe('Authentication', () => {
  let credentials: any;
  let hasherComparer: MockProxy<HasherComparer>;
  let userRepository: MockProxy<LoadUserRepository>;
  let sut: Authentication;

  beforeAll(() => {
    credentials = {
      email: 'any_user_email',
      password: 'any_user_password',
    };
    userRepository = mock();
    userRepository.load.mockResolvedValue({
      id: 'any_user_id',
      name: 'any_user_name',
      email: 'any_user_email',
      password: 'any_hashed_password',
      roleId: 'any_user_role',
    });
    hasherComparer = mock();
  });

  beforeEach(() => {
    sut = setupAuthentication(userRepository, hasherComparer);
  });

  it('Should call LoadUserRepository with correct input', async () => {
    await sut(credentials);

    expect(userRepository.load).toHaveBeenCalledWith({ email: 'any_user_email' });
    expect(userRepository.load).toHaveBeenCalledTimes(1);
  });

  it('Should rethrow if LoadUserRepository throws', async () => {
    userRepository.load.mockRejectedValueOnce(new Error('load_user_repository_error'));

    const promise = sut(credentials);

    await expect(promise).rejects.toThrow(new Error('load_user_repository_error'));
  });

  it('Should throw InvalidCredentialsError if LoadUserRepository returns null', async () => {
    userRepository.load.mockResolvedValueOnce(null);

    const promise = sut(credentials);

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  it('Should call HasherComparer with correct input', async () => {
    await sut(credentials);

    expect(hasherComparer.compare).toHaveBeenCalledWith({
      plaintext: 'any_user_password',
      digest: 'any_hashed_password',
    });
    expect(hasherComparer.compare).toHaveBeenCalledTimes(1);
  });
});
