import { sign } from 'jsonwebtoken';

import { JwtTokenGenerator } from '@/domain/contracts/gateways';

export class JwtTokenHandler implements JwtTokenGenerator {
  constructor(private readonly secret: string) {}

  async generate({ id, role, permissions, expirationInMs }:JwtTokenGenerator.Input): Promise<JwtTokenGenerator.Output> {
    const expirationInSeconds = expirationInMs / 1000;
    const token = sign({ id, role, permissions }, this.secret, { expiresIn: expirationInSeconds });
    return { token };
  }
}
