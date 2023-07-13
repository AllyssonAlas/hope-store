
import { mock, MockProxy } from 'jest-mock-extended';

import { setupAuthorization, Authorization } from '@/domain/usecases';
import { JwtTokenValidator } from '@/domain/contracts/gateways';
import { InvalidTokenError } from '@/domain/errors';

describe('Authorization', () => {
  let input: {
    token: string
  };
  let authToken: MockProxy<JwtTokenValidator>;
  let sut: Authorization;

  beforeAll(() => {
    input = {
      token: 'any_jwt_token',
    };
    authToken = mock();
    authToken.validate.mockResolvedValue({
      id: 'any_user_id',
      role: 'any_user_role',
      permissions: ['any_user_permission'],
    });
  });

  beforeEach(() => {
    sut = setupAuthorization(authToken);
  });

  it('Should call JwtTokenValidator with correct input', async () => {
    await sut(input);

    expect(authToken.validate).toHaveBeenCalledWith({ token: 'any_jwt_token' });
    expect(authToken.validate).toHaveBeenCalledTimes(1);
  });

  it('Should rethrow if JwtTokenValidator throws', async () => {
    authToken.validate.mockRejectedValueOnce(new Error('token_validator_error'));

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new Error('token_validator_error'));
  });

  it('Should throw InvalidTokenError if JwtTokenValidator returns null', async () => {
    authToken.validate.mockResolvedValueOnce(null);

    const promise = sut(input);

    await expect(promise).rejects.toThrow(new InvalidTokenError());
  });
});
