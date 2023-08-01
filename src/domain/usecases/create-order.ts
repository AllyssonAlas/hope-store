
import { Order } from '@/domain/entities';
import { LoadProductsListRepository, SaveOrderRepository } from '@/domain/contracts/repositories';
import { PostalCodeApi } from '@/domain/contracts/gateways';
import { ProductNotFoundError, InsufficientProductAmountError, InvalidAddressError } from '@/domain/errors';

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
  productRepo: LoadProductsListRepository,
  postalCode: PostalCodeApi,
  orderRepo: SaveOrderRepository
) => CreateOrder

export const setupCreateOrder: Setup = (productRepo, postalCode, orderRepo) => {
  return async ({ products, address, ...rest }) => {
    const productsIds = products.map(({ id }) => id);
    const productsData = await productRepo.loadList({ ids: productsIds });
    const checkProductNotFound = productsIds.find(id => !productsData.find(product => product.id === id));
    if (checkProductNotFound) {
      throw new ProductNotFoundError(checkProductNotFound);
    }
    const checkInsufficientAmount = productsData.find(({ id, quantity }) => {
      const productIndex = products.findIndex(p => p.id === id);
      return quantity < products[productIndex].quantity;
    });
    if (checkInsufficientAmount) {
      throw new InsufficientProductAmountError(
        checkInsufficientAmount.id,
        checkInsufficientAmount.quantity,
      );
    }
    const postalCodeResponse = await postalCode.getAddress({ postalCode: address.postalCode });
    if (!postalCodeResponse) {
      throw new InvalidAddressError();
    }
    const order = new Order({ products, address, status: 'pending', ...rest });
    order.calculateValue(productsData);
    await orderRepo.save(order);
  };
};
