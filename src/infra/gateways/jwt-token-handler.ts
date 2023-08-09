import { sign, verify } from 'jsonwebtoken';

import { JwtTokenGenerator, JwtTokenValidator } from '@/domain/contracts/gateways';

export class JwtTokenHandler implements JwtTokenGenerator, JwtTokenValidator {
  constructor(private readonly secret: string) {}

  async generate({ id, role, permissions, expirationInMs }:JwtTokenGenerator.Input): Promise<JwtTokenGenerator.Output> {
    const expirationInSeconds = expirationInMs / 1000;
    const token = sign({ id, role, permissions }, this.secret, { expiresIn: expirationInSeconds });
    return { token };
  }

  async validate({ token }: JwtTokenValidator.Input): Promise<JwtTokenValidator.Output> {
    let tokenData: any;
    try {
      tokenData = await verify(token, this.secret);
    } catch (error) {
      const jwtErrors = ['TokenExpiredError', 'JsonWebTokenError', 'NotBeforeError'];
      if (error instanceof Error && !jwtErrors.includes(error.name)) {
        throw error;
      }
      tokenData = null;
    }
    return tokenData;
  }
}
