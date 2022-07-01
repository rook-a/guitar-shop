import { Action } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';

import {
  guitarsSlice,
  fetchGuitarAction,
  fetchGuitarsAction,
  fetchGuitarsSearch,
  fetchRangeGuitars,
  setTotalProductCount,
  changeSortType,
  changeOrderType,
  resetSort,
} from './guitars-slice';
import { createAPI } from '../../services/api';

import { APIRoute, FetchStatus, OrderType, SortType } from '../../utils/const';
import { State } from '../../types/state';
import { mockGuitar } from '../../utils/mock';
import { createQuery, mockProducts } from '../../utils/utils';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

jest.mock('../../utils/utils');

const state = {
  guitars: [],
  guitarsStatus: FetchStatus.Idle,
  guitarsError: false,

  guitarsSearch: [],
  guitarsSearchStatus: FetchStatus.Idle,
  guitarsSearchError: false,

  totalProductCount: null,

  guitar: null,
  guitarStatus: FetchStatus.Idle,
  guitarError: false,

  sortType: SortType.Price,
  orderType: OrderType.Asc,
};

describe('Guitars slice', () => {
  it('without additional parameters should return initial state', () => {
    expect(guitarsSlice.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });

  it('should return total product count', () => {
    expect(guitarsSlice.reducer(state, setTotalProductCount(1))).toEqual({
      ...state,
      totalProductCount: 1,
    });
  });

  it('should change sort type', () => {
    expect(guitarsSlice.reducer(state, changeSortType(SortType.Rating))).toEqual({
      ...state,
      sortType: SortType.Rating,
    });
  });

  it('should change order type', () => {
    expect(guitarsSlice.reducer(state, changeOrderType(OrderType.Desc))).toEqual({
      ...state,
      orderType: OrderType.Desc,
    });
  });

  it('should reset sort and order types', () => {
    expect(guitarsSlice.reducer(state, resetSort())).toEqual({
      ...state,
      sortType: SortType.Price,
      orderType: OrderType.Asc,
    });
  });

  describe('guitars async action', () => {
    it('should dispatch fetchGuitarsAction when GET /guitars with query parameters', async () => {
      const fakeParams = {
        activePageNumber: 1,
        sortType: SortType.Price,
        orderType: OrderType.Asc,
        min: '',
        max: '',
        guitarType: [''],
        stringCount: [''],
      };

      const store = mockStore();

      const query = createQuery(fakeParams);

      mockAPI.onGet(`${APIRoute.Guitars}?${query}&_embed=comments`).reply(200, mockProducts, { 'X-Total-Count': 5 });

      await store.dispatch(fetchGuitarsAction(fakeParams));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toContain(fetchGuitarsAction.pending.type);
      expect(actions).toContain(fetchGuitarsAction.fulfilled.type);
      expect(actions).not.toContain(fetchGuitarsAction.rejected.type);
    });

    it('should dispatch fetchGuitarAction when GET /guitars/id ', async () => {
      const fakeGuitarId = 1;

      mockAPI.onGet(`${APIRoute.Guitars}/${fakeGuitarId}`).reply(200, mockGuitar);

      const store = mockStore();

      await store.dispatch(fetchGuitarAction(fakeGuitarId));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toContain(fetchGuitarAction.pending.type);
      expect(actions).toContain(fetchGuitarAction.fulfilled.type);
      expect(actions).not.toContain(fetchGuitarAction.rejected.type);
    });

    it('should dispatch fetchGuitarsSearch when GET /guitars?name_like=value', async () => {
      const fakeSearchValue = 'some value';

      mockAPI.onGet(`${APIRoute.Guitars}?name_like=${fakeSearchValue}`).reply(200, mockGuitar);

      const store = mockStore();

      await store.dispatch(fetchGuitarsSearch(fakeSearchValue));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toContain(fetchGuitarsSearch.pending.type);
      expect(actions).toContain(fetchGuitarsSearch.fulfilled.type);
      expect(actions).not.toContain(fetchGuitarsSearch.rejected.type);
    });

    it('should dispatch fetchRangeGuitars when GET /guitars?query-params&_embed=comments', async () => {
      const fakeActivePageNumber = 1;
      const store = mockStore({
        Guitars: {
          sortType: SortType.Price,
          orderType: OrderType.Asc,
        },
        Filter: {
          priceMin: '',
          priceMax: '',
          guitarsType: [''],
          guitarsStringCounts: [''],
        },
      });

      const sortType = store.getState().Guitars?.sortType as string | undefined;
      const orderType = store.getState().Guitars?.orderType as string | undefined;
      const min = store.getState().Filter?.priceMin as string | undefined;
      const max = store.getState().Filter?.priceMax as string | undefined;
      const guitarType = store.getState().Filter?.guitarsType as string[] | undefined;
      const stringCount = store.getState().Filter?.guitarsStringCounts as string[] | undefined;

      const query = createQuery({
        activePageNumber: fakeActivePageNumber,
        sortType,
        orderType,
        min,
        max,
        guitarType,
        stringCount,
      });

      mockAPI.onGet(`${APIRoute.Guitars}?${query}&_embed=comments`).reply(200, mockProducts);

      await store.dispatch(fetchRangeGuitars({ activePageNumber: fakeActivePageNumber }));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toContain(fetchRangeGuitars.pending.type);
      expect(actions).toContain(fetchRangeGuitars.fulfilled.type);
      expect(actions).not.toContain(fetchRangeGuitars.rejected.type);
    });
  });

  describe('fetch guitars', () => {
    it('should be update fetch guitars state to pending', () => {
      const action = {
        type: fetchGuitarsAction.pending.type,
      };

      expect(guitarsSlice.reducer(state, action)).toEqual({
        ...state,
        guitarsStatus: FetchStatus.Pending,
      });
    });

    it('should be update fetch guitars state to fulfilled', () => {
      const action = {
        type: fetchGuitarsAction.fulfilled.type,
        payload: {
          mockProducts,
        },
      };

      expect(guitarsSlice.reducer(state, action)).toEqual({
        ...state,
        guitars: action.payload,
        guitarsStatus: FetchStatus.Fulfilled,
      });
    });

    it('should be update fetch guitars state to rejected', () => {
      const action = {
        type: fetchGuitarsAction.rejected.type,
      };

      expect(guitarsSlice.reducer(state, action)).toEqual({
        ...state,
        guitarsStatus: FetchStatus.Rejected,
        guitarsError: true,
      });
    });
  });

  describe('fetch guitar', () => {
    it('should be update fetch guitar state to pending', () => {
      const action = {
        type: fetchGuitarAction.pending.type,
      };

      expect(guitarsSlice.reducer(state, action)).toEqual({
        ...state,
        guitarStatus: FetchStatus.Pending,
      });
    });

    it('should be update fetch guitar state to fulfilled', () => {
      const action = {
        type: fetchGuitarAction.fulfilled.type,
        payload: {
          mockGuitar,
        },
      };

      expect(guitarsSlice.reducer(state, action)).toEqual({
        ...state,
        guitar: action.payload,
        guitarStatus: FetchStatus.Fulfilled,
      });
    });

    it('should be update fetch guitar state to rejected', () => {
      const action = {
        type: fetchGuitarAction.rejected.type,
      };

      expect(guitarsSlice.reducer(state, action)).toEqual({
        ...state,
        guitarStatus: FetchStatus.Rejected,
        guitarError: true,
      });
    });
  });

  describe('fetch search', () => {
    it('should be update fetch search state to pending', () => {
      const action = {
        type: fetchGuitarsSearch.pending.type,
      };

      expect(guitarsSlice.reducer(state, action)).toEqual({
        ...state,
        guitarsSearchStatus: FetchStatus.Pending,
      });
    });

    it('should be update fetch search state to fulfilled', () => {
      const action = {
        type: fetchGuitarsSearch.fulfilled.type,
        payload: ['value'],
      };

      expect(guitarsSlice.reducer(state, action)).toEqual({
        ...state,
        guitarsSearchStatus: FetchStatus.Fulfilled,
        guitarsSearch: ['value'],
      });
    });

    it('should be update fetch search state to rejected', () => {
      const action = {
        type: fetchGuitarsSearch.rejected.type,
      };

      expect(guitarsSlice.reducer(state, action)).toEqual({
        ...state,
        guitarsSearchStatus: FetchStatus.Rejected,
        guitarsSearchError: true,
      });
    });
  });
});
