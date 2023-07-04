import { RequiredParamError } from '@/application/errors';

export class RequiredIntegerValidator {
  constructor(private readonly value: number, private readonly fieldName: string) {}
  validate(): Error | undefined {
    if (!Number.isInteger(this.value)) {
      return new RequiredParamError(this.fieldName);
    }
  }
}
