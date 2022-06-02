import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { handleError } from '../../services/handle-error';
import { selectActivePageNumber } from '../app-slice/app-slice';

import { APIRoute, FetchStatus, MAX_NUMBER_OF_CARDS, NameSpace, OrderType, SortType } from '../../utils/const';

import { AppDispatch, State } from '../../types/state';
import { Guitar } from '../../types/guitar';
import { Product } from '../../types/product';
import { Query } from '../../types/query';

interface InitialState {
  guitars: Product[];
  guitarsStatus: FetchStatus;
  guitarsError: boolean;

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

  totalProductCount: null,

  guitar: null,
  guitarStatus: FetchStatus.Idle,
  guitarError: false,

  sortType: SortType.Price,
  orderType: OrderType.FromLowToHigh,
};

export const fetchGuitarsAction = createAsyncThunk<
  Product[],
  Query,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchGuitars', async ({ sortType, min, max }: Query, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Product[]>(`${APIRoute.Guitars}?_sort=${sortType}&_embed=comments`);

    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
});

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
    setFilteredGuitars: (state, action) => {
      state.guitars = action.payload;
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
      });
  },
});

export const { getTotalProductCount, changeSortType, changeOrderType, setFilteredGuitars } = guitarsSlice.actions;

const selectGuitarsState = (state: State) => state[NameSpace.Guitars];

export const selectGuitars = (state: State) => selectGuitarsState(state).guitars;
export const selectGuitar = (state: State) => selectGuitarsState(state).guitar;
export const selectSortType = (state: State) => selectGuitarsState(state).sortType;
export const selectOrderType = (state: State) => selectGuitarsState(state).orderType;

export const selectFilteredGuitars = createSelector(selectGuitars, (guitars) => {
  return guitars.filter((guitar) => {
    if ('name' in guitar) {
      return true;
    }
    return false;
  });
});

export const selectSortedGuitars = createSelector(
  selectFilteredGuitars,
  selectSortType,
  selectOrderType,
  selectActivePageNumber,
  (guitars, selectSortType, selectOrderType, activePageNumber) => {
    const endLimit = activePageNumber * MAX_NUMBER_OF_CARDS;
    const startLimit = endLimit - MAX_NUMBER_OF_CARDS;
    const guitarsCopy: Product[] = guitars.slice();

    if (selectSortType === SortType.Price) {
      switch (selectOrderType) {
        case OrderType.FromLowToHigh:
          return guitarsCopy.sort((a, b) => a.price - b.price).slice(startLimit, endLimit);

        case OrderType.FromHighToLow:
          return guitarsCopy.sort((a, b) => b.price - a.price).slice(startLimit, endLimit);

        default:
          return guitars.slice(startLimit, endLimit);
      }
    } else {
      switch (selectOrderType) {
        case OrderType.FromLowToHigh:
          return guitarsCopy.sort((a, b) => a.rating - b.rating).slice(startLimit, endLimit);

        case OrderType.FromHighToLow:
          return guitarsCopy.sort((a, b) => b.rating - a.rating).slice(startLimit, endLimit);

        default:
          return guitars.slice(startLimit, endLimit);
      }
    }
  },
);
