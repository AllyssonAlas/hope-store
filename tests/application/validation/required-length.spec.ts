import { RequiredLengthValidator } from '@/application/validation';
import { InvalidRequiredParamError } from '@/application/errors';

describe('RequiredLengthValidator', () => {
  it('Should return InvalidRequiredParamError if value is empty', () => {
    const sut = new RequiredLengthValidator(50, 'any_field_name');

    const error = sut.validate();

    expect(error).toEqual(new InvalidRequiredParamError('any_field_name'));
  });
});
