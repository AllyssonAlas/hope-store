export class InvalidAddressError extends Error {
  constructor() {
    super('Error: invalid address');
    this.name = 'InvalidAddressError';
  }
}
