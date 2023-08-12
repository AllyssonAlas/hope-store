export interface SaveOrderRepository {
  save: (input: SaveOrderRepository.Input) => Promise<SaveOrderRepository.Output>;
}

export namespace SaveOrderRepository {
  export type Input = {
    userId: string;
    products: Array <{ id: string; quantity: number }>;
    contact: string;
    address: {
      street: string;
      number: string;
      neighborhood: string;
      city: string;
      state: string;
      postalCode: string;
    };
    status: string;
    value: number;
  };

  export type Output = {
    id: string;
    products: Array <{ id: string; quantity: number }>;
    status: string;
    value: number;
  }
}
