import bcrypt from 'bcrypt';

import { BcryptAdapter } from '@/infra/gateways';

jest.mock('bcrypt');

describe('BcryptAdapter', () => {
  let sut : BcryptAdapter;
  let fakeBcrypt: jest.Mocked<typeof bcrypt>;
  let salt: 12;
  let plaintext: string;

  beforeAll(() => {
    fakeBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;
    fakeBcrypt.hash.mockImplementation(() => 'hashed_string');
    fakeBcrypt.compare.mockImplementation(() => true);
    plaintext = 'any_plaintext';
    salt = 12;
  });

  beforeEach(() => {
    sut = new BcryptAdapter(salt);
  });

  describe('generate', () => {
    it('Should call sign with correct input', async () => {
      await sut.generate({ plaintext });

      expect(fakeBcrypt.hash).toHaveBeenCalledWith('any_plaintext', salt);
      expect(fakeBcrypt.hash).toHaveBeenCalledTimes(1);
    });

    test('Should throw if hash throws', async () => {
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
        throw new Error();
      });

      const promise = sut.generate({ plaintext: 'any_string' });

      await expect(promise).rejects.toThrow();
    });

    test('Should return a hashed string on succes', async () => {
      const result = await sut.generate({ plaintext: 'any_string' });

      expect(result).toEqual({ ciphertext: 'hashed_string' });
    });
  });

  describe('compare()', () => {
    test('Should call compare with correct values', async () => {
      await sut.compare({ plaintext: 'any_value', digest: 'any_digest' });

      expect(fakeBcrypt.compare).toBeCalledWith('any_value', 'any_digest');
    });

    test('Should throw if hash throws', async () => {
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
        throw new Error();
      });

      const promise = sut.compare({ plaintext: 'any_value', digest: 'any_digest' });

      await expect(promise).rejects.toThrow();
    });

    test('Should return isValid false when compare fails', async () => {
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false);

      const { isValid } = await sut.compare({ plaintext: 'any_value', digest: 'any_digest' });

      expect(isValid).toBe(false);
    });

    test('Should return isValid true on success', async () => {
      const { isValid } = await sut.compare({ plaintext: 'any_value', digest: 'any_digest' });

      expect(isValid).toBe(true);
    });
  });
});
