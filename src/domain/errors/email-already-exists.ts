export class EmailAlreadyExistsError extends Error {
  constructor() {
    super('Error: user already exists');
    this.name = 'EmailAlreadyExistsError';
  }
}
