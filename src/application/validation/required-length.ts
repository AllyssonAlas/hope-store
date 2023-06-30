import { InvalidRequiredParamError } from '@/application/errors';

export class RequiredLengthValidator {
  constructor(private readonly length: number, private readonly fieldName: string) {}
  validate(): Error | undefined {
    return new InvalidRequiredParamError(this.fieldName);
  }
}
