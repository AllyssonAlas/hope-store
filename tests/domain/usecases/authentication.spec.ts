import { mock, MockProxy } from 'jest-mock-extended';

import { setupAuthentication, Authentication } from '@/domain/usecases';
import { LoadUserRepository } from '@/domain/contracts/repositories';

jest.mock('@/domain/entities/user');

describe('Authentication', () => {
  let credentials: any;
  let userRepository: MockProxy<LoadUserRepository>;
  let sut: Authentication;

  beforeAll(() => {
    credentials = {
      email: 'any_user_email',
      password: 'any_user_password',
    };
    userRepository = mock();
    userRepository.load.mockResolvedValue(null);
  });

  beforeEach(() => {
    sut = setupAuthentication(userRepository);
  });

  it('Should call LoadUserRepository with correct input', async () => {
    await sut(credentials);

    expect(userRepository.load).toHaveBeenCalledWith({ email: 'any_user_email' });
    expect(userRepository.load).toHaveBeenCalledTimes(1);
  });
});
