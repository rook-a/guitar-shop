import { OrderType, SortType } from '../utils/const';

export interface Query {
  activePageNumber?: number;
  sortType?: SortType;
  orderType?: OrderType;
  min?: string;
  max?: string;
  guitarType?: string[];
  stringCount?: number[];
}
