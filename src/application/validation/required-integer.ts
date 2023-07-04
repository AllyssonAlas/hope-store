import { RequiredParamError } from '@/application/errors';

export class RequiredIntegerValidator {
  constructor(private readonly value: number, private readonly fieldName: string) {}
  validate(): Error | undefined {
    return new RequiredParamError(this.fieldName);
  }
}
