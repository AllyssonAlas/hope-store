import bcrypt from 'bcrypt';

import { HasherGenerator, HasherComparer } from '@/domain/contracts/gateways';

export class BcryptAdapter implements HasherGenerator, HasherComparer {
  constructor(private readonly salt: number) {}

  async generate({ plaintext }: HasherGenerator.Input): Promise<HasherGenerator.Output> {
    const ciphertext = await bcrypt.hash(plaintext, this.salt);
    return { ciphertext };
  }

  async compare({ plaintext, digest }: HasherComparer.Input): Promise<HasherComparer.Output> {
    const isValid = await bcrypt.compare(plaintext, digest);
    return { isValid };
  }
}
