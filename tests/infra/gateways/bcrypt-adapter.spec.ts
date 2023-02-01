import bcrypt from 'bcrypt';

import { BcryptAdapter } from '@/infra/gateways';

jest.mock('bcrypt');

describe('BcryptAdapter', () => {
  describe('generate', () => {
    it('Should call sign with correct input', async () => {
      const salt = 12;
      const fakeBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;
      const sut = new BcryptAdapter(salt);

      await sut.generate({ plaintext: 'any_plaintext' });

      expect(fakeBcrypt.hash).toHaveBeenCalledWith('any_plaintext', salt);
      expect(fakeBcrypt.hash).toHaveBeenCalledTimes(1);
    });
  });
});
