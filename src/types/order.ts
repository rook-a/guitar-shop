import { Coupon } from './coupon';

export interface Order {
  guitarsIds: number[];
  coupon: Coupon | null;
}
