
import { Order } from '@/domain/entities';
import { LoadProductsListRepository, SaveOrderRepository } from '@/domain/contracts/repositories';
import { PostalCode } from '@/domain/contracts/gateways';
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
    state: string
  }
}
type Output = {
  products: Array<{
    id: string
    quantity: number
  }>
  status: string
  value: number
} | Error
export type CreateOrder = (input: Input) => Promise<Output>;
type Setup = (
  productRepo: LoadProductsListRepository,
  postalCode: PostalCode,
  orderRepo: SaveOrderRepository
) => CreateOrder

export const setupCreateOrder: Setup = (productRepo, postalCode, orderRepo) => {
  return async ({ products, address, ...rest }) => {
    const productsData = await productRepo.loadList({ ids: products.map(({ id }) => id) });
    const order = new Order({ products, address, status: 'pending', ...rest });
    const checkProductNotFound = order.findInvalidProductId(productsData);
    if (checkProductNotFound) {
      return new ProductNotFoundError(checkProductNotFound);
    }
    const checkInsufficientAmount = order.findUnavailableAmount(productsData);
    if (checkInsufficientAmount?.id) {
      return new InsufficientProductAmountError(
        checkInsufficientAmount.id,
        checkInsufficientAmount.quantity,
      );
    }
    const postalCodeResponse = await postalCode.getAddress({ postalCode: address.postalCode });
    if (!postalCodeResponse) {
      return new InvalidAddressError();
    }
    order.calculateValue(productsData);
    const orderData = await orderRepo.save(order);
    return orderData;
  };
};
