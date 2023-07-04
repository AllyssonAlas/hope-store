import {
  RequiredStringValidator,
  RequiredNumberValidator,
  RequiredIntegerValidator,
  Validator,
} from '@/application/validation';

export class ValidationBuilder {
  private constructor(
    private readonly value: any,
    private readonly fieldName: string,
    private readonly validators: Validator[] = [],
  ) {}

  static of({ value, fieldName }: { value: any, fieldName: string }): ValidationBuilder {
    return new ValidationBuilder(value, fieldName);
  }

  required(valitorType: string): ValidationBuilder {
    if (valitorType === 'string') {
      this.validators.push(new RequiredStringValidator(this.value, this.fieldName));
    } else if (valitorType === 'number') {
      this.validators.push(new RequiredNumberValidator(this.value, this.fieldName));
    } else if (valitorType === 'integer') {
      this.validators.push(new RequiredIntegerValidator(this.value, this.fieldName));
    }
    return this;
  }

  build(): Validator[] {
    return this.validators;
  }
}
