export class InsufficientProductAmountError extends Error {
  constructor(id: string, quantity: number) {
    super(`Error: product with ${id} has only ${quantity} units`);
    this.name = 'InsufficientProductAmountError';
  }
}

export class ProductNotFoundError extends Error {
  constructor(id: string) {
    super(`Error: product with id ${id} was not found`);
    this.name = 'ProductNotFoundError';
  }
}

export class InvalidAddressError extends Error {
  constructor() {
    super('Error: invalid address');
    this.name = 'InvalidAddressError';
  }
}
