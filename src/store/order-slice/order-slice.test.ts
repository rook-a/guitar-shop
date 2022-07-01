import { Action } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';

import { createAPI } from '../../services/api';

import {
  sendCoupon,
  setNewProducts,
  setUpdateProduct,
  setDecProducts,
  setIncProducts,
  setCurrentAddedProduct,
  deleteCurrentProduct,
  orderSlice,
} from './order-slice';

import { APIRoute, FetchStatus } from '../../utils/const';
import { State } from '../../types/state';
import { mockOrderProduct, mockProduct } from '../../utils/mock';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

const state = {
  products: {},

  discount: 0,

  currentAddedProduct: null,

  sendCouponStatus: FetchStatus.Idle,
};

describe('Order slice', () => {
  it('without additional parameters should return initial state', () => {
    expect(orderSlice.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });

  it('should be set new products ', () => {
    expect(orderSlice.reducer(state, setNewProducts(mockOrderProduct))).toEqual({
      ...state,
      products: { ...mockOrderProduct },
    });
  });

  it('should be set updated products ', () => {
    expect(
      orderSlice.reducer(state, setUpdateProduct({ ...mockProduct, numberOfProducts: 1, totalPrice: 1234 })),
    ).toEqual({
      ...state,
      products: { 1: { ...mockProduct, numberOfProducts: 1, totalPrice: 1234 } },
    });
  });

  it('should be set decrement products ', () => {
    const state = {
      products: { 1: { ...mockProduct, numberOfProducts: 2, totalPrice: 2468 } },

      discount: 0,

      currentAddedProduct: null,

      sendCouponStatus: FetchStatus.Idle,
    };

    expect(orderSlice.reducer(state, setDecProducts({ ...mockProduct }))).toEqual({
      ...state,
      products: { 1: { ...mockProduct, numberOfProducts: 1, totalPrice: 1234 } },
    });
  });

  it('should be set increment products ', () => {
    const state = {
      products: { 1: { ...mockProduct, numberOfProducts: 1, totalPrice: 1234 } },

      discount: 0,

      currentAddedProduct: null,

      sendCouponStatus: FetchStatus.Idle,
    };

    expect(orderSlice.reducer(state, setIncProducts({ ...mockProduct }))).toEqual({
      ...state,
      products: { 1: { ...mockProduct, numberOfProducts: 2, totalPrice: 2468 } },
    });
  });

  it('should be set set current added product ', () => {
    expect(
      orderSlice.reducer(state, setCurrentAddedProduct({ ...mockProduct, numberOfProducts: 1, totalPrice: 1234 })),
    ).toEqual({
      ...state,
      currentAddedProduct: { ...mockProduct, numberOfProducts: 1, totalPrice: 1234 },
    });
  });

  it('should be delete current product ', () => {
    const state = {
      products: { 1: { ...mockProduct, numberOfProducts: 1, totalPrice: 1234 } },

      discount: 0,

      currentAddedProduct: null,

      sendCouponStatus: FetchStatus.Idle,
    };

    expect(orderSlice.reducer(state, deleteCurrentProduct(1))).toEqual({
      ...state,
      products: {},
    });
  });

  describe('order async action', () => {
    it('should dispatch sendCoupon when POST /coupons', async () => {
      const fakeCoupon = 'coupon';
      const fakeDiscount = 15;

      mockAPI.onPost(APIRoute.Coupon, { coupon: fakeCoupon }).reply(200, fakeDiscount);

      const store = mockStore();

      await store.dispatch(sendCoupon(fakeCoupon));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toContain(sendCoupon.pending.type);
      expect(actions).toContain(sendCoupon.fulfilled.type);
      expect(actions).not.toContain(sendCoupon.rejected.type);
    });
  });

  describe('send coupon', () => {
    it('should be update send coupon status to pending', () => {
      const action = {
        type: sendCoupon.pending.type,
      };

      expect(orderSlice.reducer(state, action)).toEqual({
        ...state,
        sendCouponStatus: FetchStatus.Pending,
      });
    });
    it('should be update send coupon status to fulfilled', () => {
      const action = {
        type: sendCoupon.fulfilled.type,
        payload: { discount: 15 },
      };

      expect(orderSlice.reducer(state, action)).toEqual({
        ...state,
        sendCouponStatus: FetchStatus.Fulfilled,
        discount: action.payload,
      });
    });
    it('should be update send coupon status to rejected', () => {
      const action = {
        type: sendCoupon.rejected.type,
      };

      expect(orderSlice.reducer(state, action)).toEqual({
        ...state,
        sendCouponStatus: FetchStatus.Rejected,
      });
    });
  });
});
