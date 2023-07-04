
import {
  RequiredStringValidator,
  RequiredNumberValidator,
  RequiredIntegerValidator,
  ValidationBuilder,
} from '@/application/validation';

describe('ValidationBuilder', () => {
  it('Should return a RequiredStringValidator', () => {
    const validators = ValidationBuilder
      .of({ value: 'any_value', fieldName: 'any_name' })
      .required('string')
      .build();

    expect(validators).toEqual([new RequiredStringValidator('any_value', 'any_name')]);
  });

  it('Should return a RequiredNumberValidator', () => {
    const validators = ValidationBuilder
      .of({ value: 10, fieldName: 'any_name' })
      .required('number')
      .build();

    expect(validators).toEqual([new RequiredNumberValidator(10, 'any_name')]);
  });

  it('Should return a RequiredIntegerValidator', () => {
    const validators = ValidationBuilder
      .of({ value: 10, fieldName: 'any_name' })
      .required('integer')
      .build();

    expect(validators).toEqual([new RequiredIntegerValidator(10, 'any_name')]);
  });
});
