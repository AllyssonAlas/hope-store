import { InvalidRequiredParamError } from '@/application/errors';

export class RequiredEmailValidator {
  constructor(private readonly value: string, private readonly fieldName: string) {}
  validate(): Error | undefined {
    return new InvalidRequiredParamError('email');
  }
}
