export class RequiredPermissionError extends Error {
  constructor() {
    super('Error: permission required not found');
    this.name = 'RequiredPermissionError';
  }
}
