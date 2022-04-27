import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { handleError } from '../../services/handle-error';

import { APIRoute, FetchStatus, NameSpace } from '../../utils/const';

import { AppDispatch, State } from '../../types/state';
import { Guitar } from '../../types/guitar';

interface InitialState {
  guitars: Guitar[];
  guitarsStatus: FetchStatus;
  guitarsError: boolean;

  guitar: Guitar | null;
  guitarStatus: FetchStatus;
  guitarError: boolean;
}

const initialState: InitialState = {
  guitars: [],
  guitarsStatus: FetchStatus.Idle,
  guitarsError: false,

  guitar: null,
  guitarStatus: FetchStatus.Idle,
  guitarError: false,
};

export const fetchGuitarsAction = createAsyncThunk<
  Guitar[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchGuitars', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Guitar[]>(APIRoute.Guitars);

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
  reducers: {},
  extraReducers: (buider) => {
    buider
      .addCase(fetchGuitarsAction.pending, (state) => {
        state.guitarsStatus = FetchStatus.Pending;
      })
      .addCase(fetchGuitarsAction.fulfilled, (state, action) => {
        state.guitars = action.payload;
        state.guitarsStatus = FetchStatus.Fulfilled;
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

const selectGuitarsState = (state: State) => state[NameSpace.Guitars];

export const selectGuitars = (state: State) => selectGuitarsState(state).guitars;
export const selectGuitar = (state: State) => selectGuitarsState(state).guitar;

export const selectCurrentGuitar = createSelector(selectGuitars, (guitars) => {
  return guitars.slice(0, 9);
});
