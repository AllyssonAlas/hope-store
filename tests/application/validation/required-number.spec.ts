import { RequiredNumberValidator } from '@/application/validation';
import { RequiredParamError } from '@/application/errors';

describe('RequiredNumberValidator', () => {
  it('Should return RequiredParamError if value is empty', () => {
    const sut = new RequiredNumberValidator('any_string_value' as any, 'any_field_name');

    const error = sut.validate();

    expect(error).toEqual(new RequiredParamError('any_field_name'));
  });

  it('Should return RequiredParamError if value is null', () => {
    const sut = new RequiredNumberValidator(null as any, 'any_field_name');

    const error = sut.validate();

    expect(error).toEqual(new RequiredParamError('any_field_name'));
  });

  it('Should return RequiredParamError if value is undefined', () => {
    const sut = new RequiredNumberValidator(undefined as any, 'any_field_name');

    const error = sut.validate();

    expect(error).toEqual(new RequiredParamError('any_field_name'));
  });
});
