type ProductData = {
  name: string
  description: string
  price: number
  quantity: number
  created_by: string
}

export class Product {
  name: string;
  description: string;
  price: number;
  quantity: number;
  created_by: string;

  constructor(productData: ProductData) {
    this.name = productData.name;
    this.description = productData.description;
    this.price = productData.price;
    this.quantity = productData.quantity;
    this.created_by = productData.created_by;
  }
}
