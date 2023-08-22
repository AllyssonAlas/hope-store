import { RequiredArrayValidator } from '@/application/validation';
import { InvalidRequiredParamError } from '@/application/errors';

describe('RequiredArrayValidator', () => {
  it('Should return InvalidRequiredParamError if value is not an array', () => {
    const sut = new RequiredArrayValidator('' as any, 'any_field');

    const error = sut.validate();

    expect(error).toEqual(new InvalidRequiredParamError('any_field'));
  });

  it('Should return undefined if value is an array', () => {
    const sut = new RequiredArrayValidator([], 'any_field');

    const error = sut.validate();

    expect(error).toBeUndefined();
  });
});
