
import {
  RequiredStringValidator,
  RequiredEmailValidator,
  RequiredMinLengthValidator,
  RequiredNumberValidator,
  RequiredIntegerValidator,
  RequiredArrayValidator,
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

  it('Should return a RequiredStringValidator and a RequiredEmailValidator', () => {
    const validators = ValidationBuilder
      .of({ value: 'any_value', fieldName: 'any_name' })
      .required('string')
      .email()
      .build();

    expect(validators).toEqual([
      new RequiredStringValidator('any_value', 'any_name'),
      new RequiredEmailValidator('any_value', 'any_name'),
    ]);
  });

  it('Should return a RequiredStringValidator and a RequiredMinLengthValidator', () => {
    const validators = ValidationBuilder
      .of({ value: 'any_value', fieldName: 'any_name' })
      .required('string')
      .minLength(15)
      .build();

    expect(validators).toEqual([
      new RequiredStringValidator('any_value', 'any_name'),
      new RequiredMinLengthValidator(15, 'any_value', 'any_name'),
    ]);
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

  it('Should return a RequiredArrayValidator', () => {
    const validators = ValidationBuilder
      .of({ value: [], fieldName: 'any_name' })
      .required('array')
      .build();

    expect(validators).toEqual([new RequiredArrayValidator([], 'any_name')]);
  });
});
