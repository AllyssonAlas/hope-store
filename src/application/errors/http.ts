export class ForbiddenError extends Error {
  constructor() {
    super('Access denied');
    this.name = 'ForbiddenError';
  }
}

export class ServerError extends Error {
  constructor(error?: Error) {
    super('Server failed. Try again later');
    this.name = 'ServerError';
    this.stack = error?.stack;
  }
}
