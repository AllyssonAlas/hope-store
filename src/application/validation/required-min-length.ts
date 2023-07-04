import { InvalidRequiredParamError } from '@/application/errors';

export class RequiredMinLengthValidator {
  constructor(
    private readonly length: number,
    private readonly value: string,
    private readonly fieldName: string,
  ) {}

  validate(): Error | undefined {
    if (this.value.length < this.length) {
      return new InvalidRequiredParamError(this.fieldName);
    }
  }
}
