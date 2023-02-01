import bcrypt from 'bcrypt';

import { BcryptAdapter } from '@/infra/gateways';

jest.mock('bcrypt');

describe('BcryptAdapter', () => {
  let plaintext: string;
  let salt: 12;
  let fakeBcrypt: jest.Mocked<typeof bcrypt>;
  let sut : BcryptAdapter;

  beforeAll(() => {
    plaintext = 'any_plaintext';
    salt = 12;
    fakeBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;
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
  });
});
