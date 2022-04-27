export const COUPONS = ['light-333', 'medium-444', 'height-555'];

export const enum GuitarTypeFromTheServer {
  Electric = 'electric',
  Ukulele = 'ukulele',
  Acoustic = 'acoustic',
}

export const enum GuitarTypeForClient {
  Electric = 'Электрогитара',
  Ukulele = 'Укулеле',
  Acoustic = 'Акустическая гитара',
  Unknown = 'Неизвестный тип',
}

export const enum AppRoute {
  Catalog = '/catalog',
  Guitars = '/guitars',
  Card = '/card',
  NotFound = '*',
}

export const enum HttpCode {
  BadRequest = 400,
  NotFound = 404,
}

export const enum APIRoute {
  Guitars = '/guitars',
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

export const enum NameSpace {
  App = 'App',
  Guitars = 'Guitars',
  Comments = 'Comments',
  Coupon = 'Coupon',
  Order = 'Order',
}
