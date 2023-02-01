import bcrypt from 'bcrypt';

import { HasherGenerator } from '@/domain/contracts/gateways';

export class BcryptAdapter {
  constructor(private readonly salt: number) {
  }

  async generate({ plaintext }: HasherGenerator.Input): Promise<void> {
    bcrypt.hash(plaintext, this.salt);
  }
}
