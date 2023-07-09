export class RequiredParamError extends Error {
  constructor(param: string) {
    super(`Required param: ${param}`);
    this.name = 'RequiredParamError';
  }
}

export class InvalidRequiredParamError extends Error {
  constructor(param: string) {
    super(`Invalid required param: ${param}`);
    this.name = 'InvalidRequiredParamError';
  }
}

export class InvalidRequiredMinLengthError extends Error {
  constructor(param: string, length: number) {
    super(`Param ${param} should have at least: ${length} characters`);
    this.name = 'InvalidRequiredLengthError';
  }
}

export class InvalidRequiredMinValueError extends Error {
  constructor(param: string, value: number) {
    super(`Param ${param} should be higher than ${value}`);
    this.name = 'InvalidRequiredMinValueError';
  }
}
