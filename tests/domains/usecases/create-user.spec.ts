import { mock, MockProxy } from 'jest-mock-extended';

import { setupCreateUser, CreateUser } from '@/domain/usecases';
import { LoadUserRepository } from '@/domain/contracts/repositories';

describe('CreateUser', () => {
  let loadUserRepository: MockProxy<LoadUserRepository>;
  let sut: CreateUser;

  beforeAll(() => {
    loadUserRepository = mock();
  });

  beforeEach(() => {
    sut = setupCreateUser(loadUserRepository);
  });

  it('Should call LoadUserRepository with correct input', async () => {
    await sut({
      name: 'any_user_name',
      email: 'any_user_email',
      cpf: 'any_user_cpf',
      password: 'any_user_password',
      role: 'any_user_role',
    });

    expect(loadUserRepository.load).toHaveBeenCalledWith({ email: 'any_user_email' });
    expect(loadUserRepository.load).toHaveBeenCalledTimes(1);
  });
});
