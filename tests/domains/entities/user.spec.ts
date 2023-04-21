import { User } from '@/domain/entities';

describe('User', () => {
  it('Should create an user', () => {
    const userData = {
      name: 'any_user_name',
      email: 'any_user_email',
      cpf: 'any_user_cpf',
      password: 'any_user_password',
      role: 'any_user_role',
    };

    const sut = new User(userData);

    expect(sut).toEqual({
      name: 'any_user_name',
      email: 'any_user_email',
      cpf: 'any_user_cpf',
      password: 'any_user_password',
      role: 'any_user_role',
    });
  });
});