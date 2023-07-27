export class ProductNotFoundError extends Error {
  constructor(id: string) {
    super(`Error: product with id ${id} was not found`);
    this.name = 'ProductNotFoundError';
  }
}
