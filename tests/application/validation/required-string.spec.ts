import { RequiredStringValidator } from '@/application/validation';
import { RequiredParamError } from '@/application/errors';

describe('RequiredStringValidator', () => {
  it('Should return RequiredParamError if value is empty', () => {
    const sut = new RequiredStringValidator('', 'any_field_name');

    const error = sut.validate();

    expect(error).toEqual(new RequiredParamError('any_field_name'));
  });

  it('Should return RequiredParamError if value is null', () => {
    const sut = new RequiredStringValidator(null as any, 'any_field_name');

    const error = sut.validate();

    expect(error).toEqual(new RequiredParamError('any_field_name'));
  });

  it('Should return RequiredParamError if value is undefined', () => {
    const sut = new RequiredStringValidator(undefined as any, 'any_field_name');

    const error = sut.validate();

    expect(error).toEqual(new RequiredParamError('any_field_name'));
  });

  it('Should return undefined if value is valid', () => {
    const sut = new RequiredStringValidator('any_value', 'any_field_name');

    const error = sut.validate();

    expect(error).toBeUndefined();
  });
});
