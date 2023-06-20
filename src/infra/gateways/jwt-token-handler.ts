import { sign } from 'jsonwebtoken';

import { JwtTokenGenerator } from '@/domain/contracts/gateways';

export class JwtTokenHandler {
  constructor(private readonly secret: string) {}

  async generate({ id, role, permissions, expirationInMs }:JwtTokenGenerator.Input) {
    const expirationInSeconds = expirationInMs / 1000;
    sign({ id, role, permissions }, this.secret, { expiresIn: expirationInSeconds });
  }
}
