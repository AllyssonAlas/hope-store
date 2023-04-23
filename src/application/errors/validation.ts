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
