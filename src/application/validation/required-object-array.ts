import { InvalidRequiredParamError } from '@/application/errors';

export class RequiredObjectArrayValidator {
  constructor(private readonly value: Array<any>, private readonly fieldName: string) {}

  validate(): Error | undefined {
    if (!Array.isArray(this.value)) {
      return new InvalidRequiredParamError(this.fieldName);
    }
  }
}
