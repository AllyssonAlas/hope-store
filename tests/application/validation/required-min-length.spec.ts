import { RequiredMinLengthValidator } from '@/application/validation';
import { InvalidRequiredParamError } from '@/application/errors';

describe('RequiredMinLengthValidator', () => {
  it('Should return InvalidRequiredParamError if value is empty', () => {
    const sut = new RequiredMinLengthValidator(50, 'any_field_value', 'any_field_name');

    const error = sut.validate();

    expect(error).toEqual(new InvalidRequiredParamError('any_field_name'));
  });

  it('Should return undefined if value length is higher than required', () => {
    const sut = new RequiredMinLengthValidator(10, 'any_field_value', 'any_field_name');

    const error = sut.validate();

    expect(error).toBeUndefined();
  });
});
