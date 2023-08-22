import { RequiredObjectArrayValidator } from '@/application/validation';
import { InvalidRequiredParamError } from '@/application/errors';

describe('RequiredObjectArrayValidator', () => {
  it('Should return InvalidRequiredParamError if value is not an array', () => {
    const sut = new RequiredObjectArrayValidator('' as any, 'any_field');

    const error = sut.validate();

    expect(error).toEqual(new InvalidRequiredParamError('any_field'));
  });

  it('Should return undefined if value is an array', () => {
    const sut = new RequiredObjectArrayValidator([], 'any_field');

    const error = sut.validate();

    expect(error).toBeUndefined();
  });
});
