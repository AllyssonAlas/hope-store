import { RequiredParamError } from '@/application/errors';

export class RequiredStringValidator {
  constructor(private readonly value: string, private readonly fieldName: string) {}
  validate(): Error | undefined {
    if (!this.value) {
      return new RequiredParamError(this.fieldName);
    }
  }
}
