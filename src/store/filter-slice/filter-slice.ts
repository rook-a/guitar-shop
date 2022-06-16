import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { handleError } from '../../services/handle-error';

import { APIRoute, FetchStatus, INDEX_FIRST_GUITAR, NameSpace } from '../../utils/const';

import { Guitar } from '../../types/guitar';
import { AppDispatch, State } from '../../types/state';
import { createQueryByFilter } from '../../utils/utils';

interface InitialState {
  priceMax: string;
  priceMaxStatus: FetchStatus;

  priceMin: string;
  priceMinStatus: FetchStatus;

  guitarsType: string[];
  guitarsStringCounts: string[];

  resetFilterStatus: boolean;
}

const initialState: InitialState = {
  priceMax: '',
  priceMaxStatus: FetchStatus.Idle,

  priceMin: '',
  priceMinStatus: FetchStatus.Idle,

  guitarsType: [],
  guitarsStringCounts: [],

  resetFilterStatus: false,
};

export const fetchMinPrice = createAsyncThunk<
  Guitar[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('filter/fetchMinPrice', async (_args, { dispatch, getState, extra: api }) => {
  const guitarType = getState().Filter.guitarsType;
  const stringCount = getState().Filter.guitarsStringCounts;
  const min = '';
  const max = '';

  const query = createQueryByFilter(min, max, guitarType, stringCount);

  try {
    const { data, headers } = await api.get<Guitar[]>(
      `${APIRoute.Guitars}?_sort=price&_start=${INDEX_FIRST_GUITAR}&_end=${INDEX_FIRST_GUITAR + 1}&${query}`,
    );

    dispatch(fetchMaxPrice(Number(headers['x-total-count'])));
    dispatch(changeResetFilterStatus(false));

    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
});

export const fetchMaxPrice = createAsyncThunk<
  Guitar[],
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('filter/fetchMaxPrice', async (total: number, { dispatch, getState, extra: api }) => {
  const guitarType = getState().Filter.guitarsType;
  const stringCount = getState().Filter.guitarsStringCounts;
  const min = '';
  const max = '';

  const query = createQueryByFilter(min, max, guitarType, stringCount);

  try {
    const { data } = await api.get<Guitar[]>(
      `${APIRoute.Guitars}?_sort=price&_start=${total - 1}&_end=${total}&${query}`,
    );

    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
});

export const filterSlice = createSlice({
  name: NameSpace.Filter,
  initialState,
  reducers: {
    setPrice: (state, action: PayloadAction<{ priceMin: string; priceMax: string }>) => {
      state.priceMin = action.payload.priceMin;
      state.priceMax = action.payload.priceMax;
    },
    setGuitarsType: (state, action: PayloadAction<string[]>) => {
      state.guitarsType = action.payload;
    },
    setGuitarsStringCounts: (state, action: PayloadAction<string[]>) => {
      state.guitarsStringCounts = action.payload;
    },
    resetFilter: (state) => {
      state.priceMaxStatus = initialState.priceMaxStatus;
      state.priceMinStatus = initialState.priceMinStatus;

      state.guitarsType = initialState.guitarsType;
      state.guitarsStringCounts = initialState.guitarsStringCounts;

      state.resetFilterStatus = true;
    },
    changeResetFilterStatus: (state, action: PayloadAction<boolean>) => {
      state.resetFilterStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMinPrice.pending, (state) => {
        state.priceMinStatus = FetchStatus.Pending;
      })
      .addCase(fetchMinPrice.fulfilled, (state, action: PayloadAction<Guitar[]>) => {
        state.priceMinStatus = FetchStatus.Fulfilled;
        state.priceMin = `${action.payload[INDEX_FIRST_GUITAR].price}`;
      })
      .addCase(fetchMinPrice.rejected, (state) => {
        state.priceMinStatus = FetchStatus.Rejected;
      })
      .addCase(fetchMaxPrice.pending, (state) => {
        state.priceMaxStatus = FetchStatus.Pending;
      })
      .addCase(fetchMaxPrice.fulfilled, (state, action: PayloadAction<Guitar[]>) => {
        state.priceMaxStatus = FetchStatus.Fulfilled;
        state.priceMax = `${action.payload[INDEX_FIRST_GUITAR].price}`;
      })
      .addCase(fetchMaxPrice.rejected, (state) => {
        state.priceMaxStatus = FetchStatus.Rejected;
      });
  },
});

export const { setPrice, setGuitarsType, setGuitarsStringCounts, resetFilter, changeResetFilterStatus } =
  filterSlice.actions;

const selectFilterState = (state: State) => state[NameSpace.Filter];

export const selectPriceMin = (state: State) => selectFilterState(state).priceMin;
export const selectPriceMax = (state: State) => selectFilterState(state).priceMax;
export const selectGuitarsType = (state: State) => selectFilterState(state).guitarsType;
export const selectguitarsStringCounts = (state: State) => selectFilterState(state).guitarsStringCounts;
export const selectResetFilterStatus = (state: State) => selectFilterState(state).resetFilterStatus;
