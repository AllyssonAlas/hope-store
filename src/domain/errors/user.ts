export class EmailAlreadyExistsError extends Error {
  constructor() {
    super('Error: user already exists');
    this.name = 'EmailAlreadyExistsError';
  }
}

export class NonexistentRoleError extends Error {
  constructor() {
    super('Error: role does not exist');
    this.name = 'NonexistentRoleError';
  }
}
