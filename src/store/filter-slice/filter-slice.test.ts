import { Action } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';

import {
  filterSlice,
  fetchMinPrice,
  fetchMaxPrice,
  setPrice,
  setGuitarsType,
  setGuitarsStringCounts,
  resetFilter,
  changeResetFilterStatus,
} from './filter-slice';
import { createAPI } from '../../services/api';

import { APIRoute, FetchStatus } from '../../utils/const';
import { State } from '../../types/state';
import { mockGuitar } from '../../utils/mock';
import { createQueryByFilter } from '../../utils/utils';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

jest.mock('../../utils/utils');

const state = {
  priceMax: '',
  priceMaxStatus: FetchStatus.Idle,

  priceMin: '',
  priceMinStatus: FetchStatus.Idle,

  guitarsType: [],
  guitarsStringCounts: [],

  resetFilterStatus: false,
};

describe('Filter slice', () => {
  it('without additional parameters should return initial state', () => {
    expect(filterSlice.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });

  it('should set price', () => {
    expect(filterSlice.reducer(state, setPrice({ priceMin: '1', priceMax: '2' }))).toEqual({
      ...state,
      priceMin: '1',
      priceMax: '2',
    });
  });

  it('should set guitars type', () => {
    expect(filterSlice.reducer(state, setGuitarsType(['electric']))).toEqual({
      ...state,
      guitarsType: ['electric'],
    });
  });

  it('should set guitars string counts', () => {
    expect(filterSlice.reducer(state, setGuitarsStringCounts(['7', '6', '12']))).toEqual({
      ...state,
      guitarsStringCounts: ['7', '6', '12'],
    });
  });

  it('should reset all filters', () => {
    expect(filterSlice.reducer(state, resetFilter())).toEqual({
      ...state,
      resetFilterStatus: true,
    });
  });

  it('should change resetFilterStatus', () => {
    expect(filterSlice.reducer(state, changeResetFilterStatus(true))).toEqual({
      ...state,
      resetFilterStatus: true,
    });
  });

  describe('filter async action', () => {
    it('should dispatch fetchMinPrice', async () => {
      const store = mockStore({
        Filter: {
          guitarsType: [],
          guitarsStringCounts: [],
        },
      });

      const guitarType = store.getState().Filter?.guitarsType as string[] | undefined;
      const stringCount = store.getState().Filter?.guitarsStringCounts as string[] | undefined;
      const min = '';
      const max = '';

      const query = createQueryByFilter(min, max, guitarType, stringCount);

      mockAPI
        .onGet(`${APIRoute.Guitars}?_sort=price&_start=0&_end=1&${query}`)
        .reply(200, [mockGuitar, mockGuitar], { 'X-Total-Count': 5 });

      await store.dispatch(fetchMinPrice());

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toContain(fetchMinPrice.pending.type);
      expect(actions).toContain(fetchMinPrice.fulfilled.type);
      expect(actions).not.toContain(fetchMinPrice.rejected.type);
    });

    it('should dispatch fetchMaxPrice', async () => {
      const store = mockStore({
        Filter: {
          guitarsType: [],
          guitarsStringCounts: [],
        },
      });

      const guitarType = store.getState().Filter?.guitarsType as string[] | undefined;
      const stringCount = store.getState().Filter?.guitarsStringCounts as string[] | undefined;
      const min = '';
      const max = '';

      const query = createQueryByFilter(min, max, guitarType, stringCount);

      mockAPI.onGet(`${APIRoute.Guitars}?_sort=price&_start=0&_end=1&${query}`).reply(200, [mockGuitar, mockGuitar]);

      await store.dispatch(fetchMaxPrice(1));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toContain(fetchMaxPrice.pending.type);
      expect(actions).toContain(fetchMaxPrice.fulfilled.type);
      expect(actions).not.toContain(fetchMaxPrice.rejected.type);
    });
  });
});
