import { RequiredMinValueValidator } from '@/application/validation';
import { InvalidRequiredMinValueError } from '@/application/errors';

describe('RequiredMinValueValidator', () => {
  it('Should return InvalidRequiredMinValueError if value is lesser than minValue', () => {
    const sut = new RequiredMinValueValidator(1, 0, 'any_field_name');

    const error = sut.validate();

    expect(error).toEqual(new InvalidRequiredMinValueError('any_field_name', 1));
  });

  it('Should return undefined if value is higher or equal to minValue', () => {
    const sut = new RequiredMinValueValidator(1, 1, 'any_field_name');

    const error = sut.validate();

    expect(error).toBeUndefined();
  });
});
