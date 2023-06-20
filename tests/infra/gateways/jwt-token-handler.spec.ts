import jwt from 'jsonwebtoken';

import { JwtTokenHandler } from '@/infra/gateways';

jest.mock('jsonwebtoken');

describe('JwtTokenHandler', () => {
  let token: string;
  let permissions: string[];
  let role: string;
  let id: string;
  let secret: string;
  let fakeJwt: jest.Mocked<typeof jwt>;
  let sut: JwtTokenHandler;

  beforeAll(() => {
    fakeJwt = jwt as jest.Mocked<typeof jwt>;
    secret = 'any_secret';
    id = 'any_id';
    role = 'any_role';
    permissions = ['any_permission'];
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
      await sut.generate({ id, role, permissions, expirationInMs });

      expect(fakeJwt.sign).toHaveBeenCalledWith({ id, role, permissions }, secret, { expiresIn: 1 });
      expect(fakeJwt.sign).toHaveBeenCalledTimes(1);
    });

    test('Should throw if sign throws', async () => {
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error();
      });

      const promise = sut.generate({ id, role, permissions, expirationInMs });

      await expect(promise).rejects.toThrow();
    });

    it('Should return a token', async () => {
      const generatedKey = await sut.generate({ id, role, permissions, expirationInMs });

      expect(generatedKey).toBe(token);
    });
  });
});
