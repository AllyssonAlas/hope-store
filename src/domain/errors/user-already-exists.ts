export class UserAlreadyExistsError extends Error {
  constructor() {
    super('Error: user already exists');
    this.name = 'UserAlreadyExistsError';
  }
}
