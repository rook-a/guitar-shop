import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { State } from '../../types/state';
import { Product } from '../../types/product';
import { NameSpace } from '../../utils/const';

interface OrderProducts extends Product {
  numberOfProducts: number;
  totalPrice: number;
}

interface InitialState {
  products: Record<string, OrderProducts>;

  discount: number;
  discountValue: number;

  currentAddedProduct: Product | null;
}

const initialState: InitialState = {
  products: {},

  discount: 0,
  discountValue: 0,

  currentAddedProduct: null,
};

export const orderSlice = createSlice({
  name: NameSpace.Order,
  initialState,
  reducers: {
    setNewProducts: (state, action: PayloadAction<Record<string, OrderProducts>>) => {
      state.products = { ...state.products, ...action.payload };
    },
    setCurrentAddedProduct: (state, action: PayloadAction<Product>) => {
      state.currentAddedProduct = action.payload;
    },
  },
});

export const { setNewProducts, setCurrentAddedProduct } = orderSlice.actions;

const selectOrderState = (state: State) => state[NameSpace.Order];

export const selectProducts = (state: State) => selectOrderState(state).products;
export const selectCurrentAddedProduct = (state: State) => selectOrderState(state).currentAddedProduct;

export const selectNumberOfProducts = createSelector(selectProducts, (products) => {
  return products ? Object.keys(products).length : 0;
});
