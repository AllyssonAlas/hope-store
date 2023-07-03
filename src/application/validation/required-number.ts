import { RequiredParamError } from '@/application/errors';

export class RequiredNumberValidator {
  constructor(private readonly value: number, private readonly fieldName: string) {}
  validate(): Error | undefined {
    if (!Number.isFinite(this.value)) {
      return new RequiredParamError(this.fieldName);
    }
  }
}
