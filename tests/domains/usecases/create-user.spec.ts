import { mock, MockProxy } from 'jest-mock-extended';

import { setupCreateUser, CreateUser } from '@/domain/usecases';
import { LoadUserRepository } from '@/domain/contracts/repositories';
import { HasherGenerator } from '@/domain/contracts/gateways';
import { UserAlreadyExistsError } from '@/domain/errors';

describe('CreateUser', () => {
  let user: any;
  let hasherGenerator: MockProxy<HasherGenerator>;
  let loadUserRepository: MockProxy<LoadUserRepository>;
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
    loadUserRepository = mock();
    loadUserRepository.load.mockResolvedValue(undefined);
  });

  beforeEach(() => {
    sut = setupCreateUser(loadUserRepository, hasherGenerator);
  });

  it('Should call LoadUserRepository with correct input', async () => {
    await sut(user);

    expect(loadUserRepository.load).toHaveBeenCalledWith({ email: 'any_user_email' });
    expect(loadUserRepository.load).toHaveBeenCalledTimes(1);
  });

  it('Should return a CreateUserError when LoadUserRepository returns an user', async () => {
    loadUserRepository.load.mockResolvedValueOnce({
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
});
