type ProductData = {
  name: string
  description: string
  price: number
  quantity: number
  createdBy: string
}

export class Product {
  name: string;
  description: string;
  price: number;
  quantity: number;
  createdBy: string;

  constructor(productData: ProductData) {
    this.name = productData.name;
    this.description = productData.description;
    this.price = productData.price;
    this.quantity = productData.quantity;
    this.createdBy = productData.createdBy;
  }
}
