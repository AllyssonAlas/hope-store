export class InvalidCredentialsError extends Error {
  constructor() {
    super('Error: user already exists');
    this.name = 'InvalidCredentialsError';
  }
}
