import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { handleError } from '../../services/handle-error';

import { Guitar } from '../../types/guitar';
import { AppDispatch, State } from '../../types/state';
import { APIRoute, FetchStatus, INDEX_FIRST_GUITAR, NameSpace } from '../../utils/const';

interface InitialState {
  priceMax: number;
  priceMaxStatus: FetchStatus;

  priceMin: number;
  priceMinStatus: FetchStatus;
}

const initialState: InitialState = {
  priceMax: 0,
  priceMaxStatus: FetchStatus.Idle,

  priceMin: 0,
  priceMinStatus: FetchStatus.Idle,
};

export const fetchMinPrice = createAsyncThunk<
  Guitar[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('filter/fetchMaxPrice', async (_args, { dispatch, extra: api }) => {
  try {
    const { data, headers } = await api.get<Guitar[]>(
      `${APIRoute.Guitars}?_sort=price&_start=${INDEX_FIRST_GUITAR}&_end=${INDEX_FIRST_GUITAR + 1}`,
    );

    dispatch(fetchMaxPrice(Number(headers['x-total-count'])));

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
>('filter/fetchMinPrice', async (total: number, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Guitar[]>(`${APIRoute.Guitars}?_sort=price&_start=${total - 1}&_end=${total}`);

    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
});

export const filterSlice = createSlice({
  name: NameSpace.Filter,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMinPrice.pending, (state) => {
      state.priceMinStatus = FetchStatus.Pending;
    });
    builder.addCase(fetchMinPrice.fulfilled, (state, action: PayloadAction<Guitar[]>) => {
      state.priceMinStatus = FetchStatus.Fulfilled;
      state.priceMin = action.payload[INDEX_FIRST_GUITAR].price;
    });
    builder.addCase(fetchMinPrice.rejected, (state) => {
      state.priceMinStatus = FetchStatus.Rejected;
    });
    builder.addCase(fetchMaxPrice.pending, (state) => {
      state.priceMaxStatus = FetchStatus.Pending;
    });
    builder.addCase(fetchMaxPrice.fulfilled, (state, action: PayloadAction<Guitar[]>) => {
      state.priceMaxStatus = FetchStatus.Fulfilled;
      state.priceMax = action.payload[INDEX_FIRST_GUITAR].price;
    });
    builder.addCase(fetchMaxPrice.rejected, (state) => {
      state.priceMaxStatus = FetchStatus.Rejected;
    });
  },
});

const selectFilterState = (state: State) => state[NameSpace.Filter];

export const selectPriceMin = (state: State) => selectFilterState(state).priceMin;
export const selectPriceMax = (state: State) => selectFilterState(state).priceMax;
