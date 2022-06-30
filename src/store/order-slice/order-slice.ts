import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { State } from '../../types/state';
import { Product } from '../../types/product';
import { NameSpace } from '../../utils/const';
import { OrderProducts } from '../../types/order-products';

interface InitialState {
  products: Record<string, OrderProducts>;

  discount: number;
  discountValue: number;

  currentAddedProduct: OrderProducts | null;
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
    setUpdateProduct: (state, action: PayloadAction<OrderProducts>) => {
      const index = action.payload.id;
      state.products[index] = action.payload;
    },
    setDecProducts: (state, action) => {
      const index = action.payload.id;
      state.products[index].numberOfProducts = state.products[index].numberOfProducts - 1;
      state.products[index].totalPrice = state.products[index].totalPrice - action.payload.price;
    },
    setIncProducts: (state, action: PayloadAction<Product>) => {
      const index = action.payload.id;
      state.products[index].numberOfProducts = state.products[index].numberOfProducts + 1;
      state.products[index].totalPrice = state.products[index].totalPrice + action.payload.price;
    },
    setCurrentAddedProduct: (state, action: PayloadAction<OrderProducts>) => {
      state.currentAddedProduct = action.payload;
    },
    deleteCurrentProduct: (state, action: PayloadAction<number>) => {
      delete state.products[action.payload];
    },
  },
});

export const {
  setNewProducts,
  setUpdateProduct,
  setDecProducts,
  setIncProducts,
  deleteCurrentProduct,
  setCurrentAddedProduct,
} = orderSlice.actions;

const selectOrderState = (state: State) => state[NameSpace.Order];

export const selectProducts = (state: State) => selectOrderState(state).products;
export const selectCurrentAddedProduct = (state: State) => selectOrderState(state).currentAddedProduct;

export const selectNumberOfProducts = createSelector(selectProducts, (products) => {
  return products ? Object.keys(products).length : 0;
});
