
import { LoadProductsListRepository } from '@/domain/contracts/repositories';

type Input = {
  userId: string
  products: Array<{
    id: string
    quantity: number
  }>
  contact: string
  address: {
    street: string
    number: string
    neighborhood: string
    city: string
    postalCode: string
  }
}
export type CreateOrder = (input: Input) => Promise<void>;
type Setup = (
  productRepo: LoadProductsListRepository
) => CreateOrder

export const setupCreateOrder: Setup = (productRepo) => {
  return async ({ products }) => {
    await productRepo.loadList({ ids: products.map(({ id }) => id) });
  };
};
