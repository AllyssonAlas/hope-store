import jwt from 'jsonwebtoken';

import { JwtTokenHandler } from '@/infra/gateways';

jest.mock('jsonwebtoken');

describe('JwtTokenHandler', () => {
  let sut: JwtTokenHandler;
  let fakeJwt: jest.Mocked<typeof jwt>;
  let token: string;
  let secret: string;
  let tokenData: {
    id: string;
    role: string;
    permissions: string[];
  };

  beforeAll(() => {
    fakeJwt = jwt as jest.Mocked<typeof jwt>;
    secret = 'any_secret';
    tokenData = {
      id: 'any_id',
      role: 'any_role',
      permissions: ['any_permission'],
    };
    token = 'any_token';
  });

  beforeEach(() => {
    sut = new JwtTokenHandler(secret);
  });

  describe('generate', () => {
    let expirationInMs: number;

    beforeAll(() => {
      expirationInMs = 1000;
      fakeJwt.sign.mockImplementation(() => token);
    });

    it('Should call sign with correct input', async () => {
      await sut.generate({ ...tokenData, expirationInMs });

      expect(fakeJwt.sign).toHaveBeenCalledWith(tokenData, secret, { expiresIn: 1 });
      expect(fakeJwt.sign).toHaveBeenCalledTimes(1);
    });

    test('Should throw if sign throws', async () => {
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error();
      });

      const promise = sut.generate({ ...tokenData, expirationInMs });

      await expect(promise).rejects.toThrow();
    });

    it('Should return a token', async () => {
      const generatedKey = await sut.generate({ ...tokenData, expirationInMs });

      expect(generatedKey).toEqual({ token });
    });
  });

  describe('verify', () => {
    beforeAll(() => {
      fakeJwt.verify.mockImplementation(() => ({
        id: 'any_user_id',
        role: 'any_user_role',
        permissions: ['any_user_permission'],
      }));
    });

    test('Should call verify with correct input', async () => {
      await sut.validate({ token });

      expect(fakeJwt.verify).toHaveBeenCalledWith(token, secret);
      expect(fakeJwt.verify).toHaveBeenCalledTimes(1);
    });

    test('Should throw if sign throws', async () => {
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
        throw new Error();
      });

      const promise = sut.validate({ token });

      await expect(promise).rejects.toThrow();
    });

    test('Should return null on failure', async () => {
      const jwtError = new Error();
      jwtError.name = 'TokenExpiredError';
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
        throw jwtError;
      });

      const result = await sut.validate({ token });

      expect(result).toBeNull();
    });

    it('Should return an user id and its role and permissions', async () => {
      const validatedData = await sut.validate({ token });

      expect(validatedData).toEqual({
        id: 'any_user_id',
        role: 'any_user_role',
        permissions: ['any_user_permission'],
      });
    });
  });
});
