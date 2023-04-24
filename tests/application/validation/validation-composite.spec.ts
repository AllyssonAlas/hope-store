
import { mock, MockProxy } from 'jest-mock-extended';

import { Validator, ValidationComposite } from '@/application/validation';

describe('ValidationComposite', () => {
  let sut: ValidationComposite;
  let validator1: MockProxy<Validator>;
  let validator2: MockProxy<Validator>;
  let validators: Validator[];

  beforeAll(() => {
    validator1 = mock();
    validator1.validate.mockReturnValue(undefined);
    validator2 = mock();
    validator2.validate.mockReturnValue(undefined);
    validators = [validator1, validator2];
  });

  beforeEach(() => {
    sut = new ValidationComposite(validators);
  });

  it('Should return undefined if all Valitadors return undefined', () => {
    const error = sut.validate();

    expect(error).toBeUndefined();
  });
});
