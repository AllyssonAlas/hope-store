import { InvalidRequiredMinValueError } from '@/application/errors';

export class RequiredMinValueValidator {
  constructor(private readonly minValue: number, private readonly value: number, private readonly fieldName: string) {}
  validate(): Error | undefined {
    if (this.value < this.minValue) {
      return new InvalidRequiredMinValueError(this.fieldName, this.minValue);
    }
  }
}
