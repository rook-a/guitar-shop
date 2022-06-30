export const enum CurrentCoupons {
  Light = 'light-333',
  Medium = 'medium-444',
  Height = 'height-555',
}

export const enum SendCouponMessage {
  Success = 'Промокод принят',
  Error = 'Неверный промокод',
}

export interface Coupon {
  coupon: CurrentCoupons;
}
