import { RequiredParamError } from '@/application/errors';

export class RequiredStringValidator {
  constructor(private readonly value: string, private readonly fieldName: string) {}
  validate(): Error | undefined {
    return new RequiredParamError('any_field_name');
  }
}
