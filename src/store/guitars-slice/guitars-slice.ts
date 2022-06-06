import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { handleError } from '../../services/handle-error';

import { APIRoute, FetchStatus, NameSpace, OrderType, SortType } from '../../utils/const';
import { createQuery } from '../../utils/utils';

import { AppDispatch, State } from '../../types/state';
import { Guitar } from '../../types/guitar';
import { Product } from '../../types/product';
import { Query } from '../../types/query';

interface InitialState {
  guitars: Product[];
  guitarsStatus: FetchStatus;
  guitarsError: boolean;

  guitarsSearch: Guitar[];
  guitarsSearchStatus: FetchStatus;
  guitarsSearchError: boolean;

  totalProductCount: number | null;

  guitar: Guitar | null;
  guitarStatus: FetchStatus;
  guitarError: boolean;

  sortType: SortType;
  orderType: OrderType;
}

const initialState: InitialState = {
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

export const fetchGuitarsAction = createAsyncThunk<
  Product[],
  Query,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/fetchGuitars',
  async (
    { activePageNumber, sortType, orderType, min, max, guitarType, stringCount }: Query,
    { dispatch, extra: api },
  ) => {
    const query = createQuery({ activePageNumber, sortType, orderType, min, max, guitarType, stringCount });

    try {
      const { data, headers } = await api.get<Product[]>(`${APIRoute.Guitars}?${query}&_embed=comments`);

      dispatch(getTotalProductCount(Number(headers['x-total-count'])));

      return data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
);

export const fetchGuitarAction = createAsyncThunk<
  Guitar,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchGuitar', async (id: number, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Guitar>(`${APIRoute.Guitars}/${id}`);

    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
});

export const fetchGuitarsSearch = createAsyncThunk<
  Guitar[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchGuitarsSearch', async (value: string, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Guitar[]>(`${APIRoute.Guitars}?name_like=${value}`);

    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
});

export const guitarsSlice = createSlice({
  name: NameSpace.Guitars,
  initialState,
  reducers: {
    getTotalProductCount: (state, action) => {
      state.totalProductCount = action.payload;
    },
    changeSortType: (state, action) => {
      state.sortType = action.payload;
    },
    changeOrderType: (state, action) => {
      state.orderType = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setorderType: (state, action) => {
      state.orderType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuitarsAction.pending, (state) => {
        state.guitarsStatus = FetchStatus.Pending;
      })
      .addCase(fetchGuitarsAction.fulfilled, (state, action) => {
        state.guitarsStatus = FetchStatus.Fulfilled;
        state.guitars = action.payload;
      })
      .addCase(fetchGuitarsAction.rejected, (state) => {
        state.guitarsStatus = FetchStatus.Rejected;
        state.guitarsError = true;
      })
      .addCase(fetchGuitarAction.pending, (state) => {
        state.guitarStatus = FetchStatus.Pending;
      })
      .addCase(fetchGuitarAction.fulfilled, (state, action) => {
        state.guitar = action.payload;
        state.guitarStatus = FetchStatus.Fulfilled;
      })
      .addCase(fetchGuitarAction.rejected, (state) => {
        state.guitarStatus = FetchStatus.Rejected;
        state.guitarError = true;
      })
      .addCase(fetchGuitarsSearch.pending, (state) => {
        state.guitarsSearchStatus = FetchStatus.Pending;
      })
      .addCase(fetchGuitarsSearch.fulfilled, (state, action) => {
        state.guitarsSearch = action.payload;
        state.guitarsSearchStatus = FetchStatus.Fulfilled;
      })
      .addCase(fetchGuitarsSearch.rejected, (state) => {
        state.guitarsSearchStatus = FetchStatus.Rejected;
        state.guitarsSearchError = true;
      });
  },
});

export const { getTotalProductCount, changeSortType, changeOrderType, setSortType, setorderType } =
  guitarsSlice.actions;

const selectGuitarsState = (state: State) => state[NameSpace.Guitars];

export const selectGuitars = (state: State) => selectGuitarsState(state).guitars;
export const selectGuitar = (state: State) => selectGuitarsState(state).guitar;
export const selectSortType = (state: State) => selectGuitarsState(state).sortType;
export const selectOrderType = (state: State) => selectGuitarsState(state).orderType;
export const selectTotalProductCount = (state: State) => selectGuitarsState(state).totalProductCount;
export const selectGuitarsSearch = (state: State) => selectGuitarsState(state).guitarsSearch;
