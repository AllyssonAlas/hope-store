import { RequiredMinLengthValidator } from '@/application/validation';
import { InvalidRequiredMinLengthError } from '@/application/errors';

describe('RequiredMinLengthValidator', () => {
  it('Should return InvalidRequiredMinLengthError if value is empty', () => {
    const sut = new RequiredMinLengthValidator(50, 'any_field_value', 'any_field_name');

    const error = sut.validate();

    expect(error).toEqual(new InvalidRequiredMinLengthError('any_field_name', 50));
  });

  it('Should return undefined if value length is higher than required', () => {
    const sut = new RequiredMinLengthValidator(10, 'any_field_value', 'any_field_name');

    const error = sut.validate();

    expect(error).toBeUndefined();
  });
});
