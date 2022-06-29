import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coupon } from '../../types/coupon';

import { State } from '../../types/state';
import { NameSpace } from '../../utils/const';

interface InitialState {
  products: {
    id: {
      numberOfProducts: number;
      price: number;
    };
  };
  coupon: Coupon | null;
  discount: number;
}

const initialState: InitialState = {
  products: {
    id: {
      numberOfProducts: 0,
      price: 0,
    },
  },
  coupon: null,
  discount: 0,
};

export const orderSlice = createSlice({
  name: NameSpace.Order,
  initialState,
  reducers: {},
});

const selectOrderState = (state: State) => state[NameSpace.Order];
