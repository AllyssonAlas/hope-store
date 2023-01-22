import { mock } from 'jest-mock-extended';

import { setupCreateUser } from '@/domain/usecases';
import { LoadUserRepository } from '@/domain/contracts/repositories';

describe('CreateUser', () => {
  it('Should call LoadUserRepository with  correct input', async () => {
    const loadUserRepository = mock<LoadUserRepository>();
    const sut = setupCreateUser(loadUserRepository);

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
