import { RequiredMinValueValidator } from '@/application/validation';
import { InvalidRequiredParamError } from '@/application/errors';

describe('RequiredMinValueValidator', () => {
  it('Should return InvalidRequiredParamError if value is lesser than minValue', () => {
    const sut = new RequiredMinValueValidator(1, 0, 'any_field_name');

    const error = sut.validate();

    expect(error).toEqual(new InvalidRequiredParamError('any_field_name'));
  });
});
