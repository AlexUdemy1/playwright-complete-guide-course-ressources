export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    quantity: number;
    stock: number;
    image: string;
  }

  export type AddToCartButtonProps = {
    product: Product;
  };