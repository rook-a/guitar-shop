export const MAX_NUMBER_OF_CARDS = 9;
export const START_PAGE_NUMBER = 1;
export const START_COUNT_COMMENT = 3;
export const FAKE_ARRAY_LENGTH = 5;
export const INDEX_FIRST_GUITAR = 0;
export const MAX_ADDED_PRODUCTS = 99;

interface RatingLabel {
  [key: number]: string;
}

export const RatingLabelMap: RatingLabel = {
  1: 'Ужасно',
  2: 'Плохо',
  3: 'Нормально',
  4: 'Хорошо',
  5: 'Отлично',
} as const;

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
  Root = '/',
  Main = '/catalog',
  Catalog = '/catalog',
  Product = '/product',
  Card = '/card',
  NotFound = '*',
  Services = '/services',
  About = '/about',
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
  Modal = 'Modal',
  Guitars = 'Guitars',
  Comments = 'Comments',
  Order = 'Order',
  Filter = 'Filter',
}

export const enum SortType {
  Price = 'price',
  Rating = 'rating',
}

const enum SortLabel {
  Price = 'по цене',
  Rating = 'по популярности',
}

export const SortTypeMap = [
  {
    type: SortType.Price,
    label: SortLabel.Price,
  },
  {
    type: SortType.Rating,
    label: SortLabel.Rating,
  },
];

export const enum OrderType {
  Asc = 'asc',
  Desc = 'desc',
}

export const GuitarsTypeMap = [
  {
    label: 'Акустические гитары',
    type: GuitarTypeFromTheServer.Acoustic,
  },
  {
    label: 'Электрогитары',
    type: GuitarTypeFromTheServer.Electric,
  },
  {
    label: 'Укулеле',
    type: GuitarTypeFromTheServer.Ukulele,
  },
] as const;

export const GuitarStringCountsMap = {
  acoustic: ['6', '7', '12'],
  electric: ['4', '6', '7'],
  ukulele: ['4'],
} as const;

export const GuitarsStringMap = [
  {
    id: '4-strings',
    stringCount: 4,
  },
  {
    id: '6-strings',
    stringCount: 6,
  },
  {
    id: '7-strings',
    stringCount: 7,
  },
  {
    id: '12-strings',
    stringCount: 12,
  },
] as const;

export const enum MenuLabel {
  Catalog = 'Каталог',
  Services = 'Где купить?',
  About = 'О компании',
  Cart = 'Корзина',
  Product = 'Товар',
}

export const MenuLinksMap = [
  {
    label: MenuLabel.Catalog,
    route: AppRoute.Root,
  },
  {
    label: MenuLabel.Services,
    route: AppRoute.Services,
  },
  {
    label: MenuLabel.About,
    route: AppRoute.About,
  },
] as const;
