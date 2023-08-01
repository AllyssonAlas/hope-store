type OrderData = {
  userId: string;
  products: Array <{ id: string; quantity: number }>;
  contact: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    postalCode: string;
  };
  status: string;
  value?: number;
};

export class Order {
  userId: string;
  products: Array <{ id: string; quantity: number }>;
  contact: string;
  status: string;
  value: number;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    postalCode: string;
  };

  constructor(orderData: OrderData) {
    this.userId = orderData.userId;
    this.products = orderData.products;
    this.contact = orderData.contact;
    this.address = orderData.address;
    this.status = orderData.status;
    this.value = orderData.value || 0;
  }
}
