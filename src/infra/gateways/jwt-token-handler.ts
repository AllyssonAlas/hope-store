import { sign, verify } from 'jsonwebtoken';

import { JwtTokenGenerator, JwtTokenValidator } from '@/domain/contracts/gateways';

export class JwtTokenHandler implements JwtTokenGenerator {
  constructor(private readonly secret: string) {}

  async generate({ id, role, permissions, expirationInMs }:JwtTokenGenerator.Input): Promise<JwtTokenGenerator.Output> {
    const expirationInSeconds = expirationInMs / 1000;
    const token = sign({ id, role, permissions }, this.secret, { expiresIn: expirationInSeconds });
    return { token };
  }

  async validate({ token }: JwtTokenValidator.Input): Promise<JwtTokenValidator.Output> {
    try {
      await verify(token, this.secret);
    } catch (error) {
      const jwtErrors = ['TokenExpiredError', 'JsonWebTokenError', 'NotBeforeError'];
      if (error instanceof Error && !jwtErrors.includes(error.name)) {
        throw error;
      }
    }

    return null;
  }
}
