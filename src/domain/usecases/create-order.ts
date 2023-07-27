
import { LoadProductsListRepository } from '@/domain/contracts/repositories';
import { ProductNotFoundError } from '@/domain/errors';

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
    const productsIds = products.map(({ id }) => id);
    const productsData = await productRepo.loadList({ ids: productsIds });
    const checkProductNotFound = productsIds.find(id => !productsData.find(product => product.id === id));
    if (checkProductNotFound) {
      throw new ProductNotFoundError(checkProductNotFound);
    }
  };
};
