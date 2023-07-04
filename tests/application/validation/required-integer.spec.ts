import { RequiredIntegerValidator } from '@/application/validation';
import { RequiredParamError } from '@/application/errors';

describe('RequiredIntegerValidator', () => {
  it('Should return RequiredParamError if value is empty', () => {
    const sut = new RequiredIntegerValidator('any_string_value' as any, 'any_field_name');

    const error = sut.validate();

    expect(error).toEqual(new RequiredParamError('any_field_name'));
  });

  it('Should return RequiredParamError if value is null', () => {
    const sut = new RequiredIntegerValidator(null as any, 'any_field_name');

    const error = sut.validate();

    expect(error).toEqual(new RequiredParamError('any_field_name'));
  });

  it('Should return RequiredParamError if value is undefined', () => {
    const sut = new RequiredIntegerValidator(undefined as any, 'any_field_name');

    const error = sut.validate();

    expect(error).toEqual(new RequiredParamError('any_field_name'));
  });

  it('Should return RequiredParamError if value is a float', () => {
    const sut = new RequiredIntegerValidator(10.5, 'any_field_name');

    const error = sut.validate();

    expect(error).toEqual(new RequiredParamError('any_field_name'));
  });

  it('Should return undefined if value is an integer', () => {
    const sut = new RequiredIntegerValidator(10, 'any_field_name');

    const error = sut.validate();

    expect(error).toBeUndefined();
  });
});
