import { RequiredEmailValidator } from '@/application/validation';
import { InvalidRequiredParamError } from '@/application/errors';

describe('RequiredStringValidator', () => {
  it('Should return InvalidRequiredParamError if value is empty', () => {
    const sut = new RequiredEmailValidator('', 'email');

    const error = sut.validate();

    expect(error).toEqual(new InvalidRequiredParamError('email'));
  });

  it('Should return InvalidRequiredParamError if value is null', () => {
    const sut = new RequiredEmailValidator(null as any, 'email');

    const error = sut.validate();

    expect(error).toEqual(new InvalidRequiredParamError('email'));
  });

  it('Should return InvalidRequiredParamError if value is undefined', () => {
    const sut = new RequiredEmailValidator(undefined as any, 'email');

    const error = sut.validate();

    expect(error).toEqual(new InvalidRequiredParamError('email'));
  });

  it('Should return InvalidRequiredParamError if value is invalid', () => {
    const sut = new RequiredEmailValidator('invalid_email' as any, 'email');

    const error = sut.validate();

    expect(error).toEqual(new InvalidRequiredParamError('email'));
  });

  it('Should return undefined if value is valid', () => {
    const sut = new RequiredEmailValidator('valid_email@mail.com' as any, 'email');

    const error = sut.validate();

    expect(error).toBeUndefined();
  });
});
