import { createSelector, createSlice } from '@reduxjs/toolkit';
import { Coupon } from '../../types/coupon';

import { State } from '../../types/state';
import { NameSpace } from '../../utils/const';

interface OrderProducts {
  numberOfProducts: number;
  price: number;
}

interface InitialState {
  products: Record<string, OrderProducts> | null;
  coupon: Coupon | null;
  discount: number;
}

const initialState: InitialState = {
  products: null,
  coupon: null,
  discount: 0,
};

export const orderSlice = createSlice({
  name: NameSpace.Order,
  initialState,
  reducers: {},
});

const selectOrderState = (state: State) => state[NameSpace.Order];

export const selectProducts = (state: State) => selectOrderState(state).products;
export const selectNumberOfProducts = createSelector(selectProducts, (products) => {
  return products ? Object.keys(products).length : 0;
});
