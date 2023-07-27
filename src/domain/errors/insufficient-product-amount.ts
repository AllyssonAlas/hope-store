export class InsufficientProductAmountError extends Error {
  constructor(id: string, quantity: number) {
    super(`Error: product with ${id} has only ${quantity} units`);
    this.name = 'InsufficientProductAmountError';
  }
}
