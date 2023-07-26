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

export interface LoadProductsListRepository {
  loadList: (input: LoadProductsListRepository.Input) => Promise<LoadProductsListRepository.Output>;
}

export namespace LoadProductsListRepository {
  export type Input = {
    ids: string[];
  }

  export type Output = Array<{
    id: string
    name: string;
    description: string;
    price: number;
    quantity: number;
  }>
}
