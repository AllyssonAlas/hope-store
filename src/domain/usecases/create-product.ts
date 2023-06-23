
import { CreateProductRepository } from '@/domain/contracts/repositories';

type Input = {
  name: string
  description: string,
  price: number,
  quantity: number,
  createdBy: string,
}
export type CreateProduct = (input: Input) => Promise<void>
type Setup = (productRepo: CreateProductRepository) => CreateProduct

export const setupCreateProduct: Setup = (productRepo) => {
  return async (input) => {
    await productRepo.create(input);
  };
};
