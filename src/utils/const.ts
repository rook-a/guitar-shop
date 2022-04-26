export const COUPONS = ['light-333', 'medium-444', 'height-555'];

export const enum HttpCode {
  BadRequest = 400,
  NotFound = 404,
}

export const enum APIRoute {
  Guitar = '/guitars',
  Comment = '/comments',
  Coupon = '/coupons',
  Order = '/orders',
}

export enum FetchStatus {
  Idle = 'Idle',
  Pending = 'Pending',
  Fulfilled = 'Fulfilled',
  Rejected = 'Rejected',
}
