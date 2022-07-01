import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { handleError } from '../../services/handle-error';

import { AppDispatch, State } from '../../types/state';
import { Product } from '../../types/product';
import { OrderProducts } from '../../types/order-products';

import { NameSpace, APIRoute, FetchStatus } from '../../utils/const';

interface InitialState {
  products: Record<string, OrderProducts>;

  discount: number;

  currentAddedProduct: OrderProducts | null;

  sendCouponStatus: FetchStatus;
}

const initialState: InitialState = {
  products: {},

  discount: 0,

  currentAddedProduct: null,

  sendCouponStatus: FetchStatus.Idle,
};

export const sendCoupon = createAsyncThunk<
  number,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('order/sendCoupon', async (coupon, { dispatch, extra: api }) => {
  try {
    const { data } = await api.post<number>(APIRoute.Coupon, { coupon });

    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
});

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
    setDecProducts: (state, action: PayloadAction<Product>) => {
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
  extraReducers: (builder) => {
    builder
      .addCase(sendCoupon.pending, (state) => {
        state.sendCouponStatus = FetchStatus.Pending;
      })
      .addCase(sendCoupon.fulfilled, (state, action: PayloadAction<number>) => {
        state.sendCouponStatus = FetchStatus.Fulfilled;
        state.discount = action.payload;
      })
      .addCase(sendCoupon.rejected, (state) => {
        state.sendCouponStatus = FetchStatus.Rejected;
      });
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
export const selectSendCouponStatus = (state: State) => selectOrderState(state).sendCouponStatus;
export const selectDiscount = (state: State) => selectOrderState(state).discount;

export const selectNumberOfProducts = createSelector(selectProducts, (products) => {
  return products ? Object.keys(products).length : 0;
});

export const selectProductsTotalPrice = createSelector(selectProducts, (products) => {
  return Object.values(products).reduce((acc, product) => {
    return (acc += product.totalPrice);
  }, 0);
});

export const selectTotalNumberOfProducts = createSelector(selectProducts, (products) => {
  return Object.values(products).reduce((acc, product) => {
    return (acc += product.numberOfProducts);
  }, 0);
});

export const selectDiscountValue = createSelector(selectProductsTotalPrice, selectDiscount, (totalPrice, discount) => {
  return (totalPrice * discount) / 100;
});
