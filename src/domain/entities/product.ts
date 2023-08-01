type ProductData = {
  id?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export class Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;

  constructor(productData: ProductData) {
    this.id = productData.id;
    this.name = productData.name;
    this.description = productData.description;
    this.price = productData.price;
    this.quantity = productData.quantity;
  }
}
