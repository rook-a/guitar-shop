import { Product } from './product';

export interface OrderProducts extends Product {
  numberOfProducts: number;
  totalPrice: number;
}
