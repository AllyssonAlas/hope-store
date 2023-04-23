import { InvalidRequiredParamError } from '@/application/errors';

export class RequiredEmailValidator {
  constructor(private readonly value: string, private readonly fieldName: string) {}
  validate(): Error | undefined {
    if (!(/^[\w.]+@\w+.\w{2,}(?:.\w{2})?$/gmi).test(this.value)) {
      return new InvalidRequiredParamError(this.fieldName);
    }
  }
}
