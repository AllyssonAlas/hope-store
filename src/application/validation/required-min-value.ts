import { InvalidRequiredParamError } from '@/application/errors';

export class RequiredMinValueValidator {
  constructor(private readonly minValue: number, private readonly value: number, private readonly fieldName: string) {}
  validate(): Error | undefined {
    return new InvalidRequiredParamError(this.fieldName);
  }
}
