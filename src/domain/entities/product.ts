type ProductData = {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export class Product {
  name: string;
  description: string;
  price: number;
  quantity: number;

  constructor(productData: ProductData) {
    this.name = productData.name;
    this.description = productData.description;
    this.price = productData.price;
    this.quantity = productData.quantity;
  }
}
