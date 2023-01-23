import { mock, MockProxy } from 'jest-mock-extended';

import { setupCreateUser, CreateUser } from '@/domain/usecases';
import { LoadUserRepository } from '@/domain/contracts/repositories';
import { UserAlreadyExistsError } from '@/domain/errors';

describe('CreateUser', () => {
  const user = {
    name: 'any_user_name',
    email: 'any_user_email',
    cpf: 'any_user_cpf',
    password: 'any_user_password',
    role: 'any_user_role',
  };

  let loadUserRepository: MockProxy<LoadUserRepository>;
  let sut: CreateUser;

  beforeAll(() => {
    loadUserRepository = mock();
    loadUserRepository.load.mockResolvedValue(undefined);
  });

  beforeEach(() => {
    sut = setupCreateUser(loadUserRepository);
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
});
