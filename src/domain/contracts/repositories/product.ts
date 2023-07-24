export interface CreateProductRepository {
  create: (input: CreateProductRepository.Input) => Promise<void>;
}

export namespace CreateProductRepository {
  export type Input = {
    name: string;
    description: string;
    price: number;
    quantity: number;
  }
}
