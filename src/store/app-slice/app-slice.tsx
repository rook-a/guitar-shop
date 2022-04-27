import { createSlice } from '@reduxjs/toolkit';

import { NameSpace, START_PAGE_NUMBER } from '../../utils/const';

import { State } from '../../types/state';

interface InitialState {
  currentPaginationPage: number;
}

const initialState: InitialState = {
  currentPaginationPage: START_PAGE_NUMBER,
};

export const appSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changePaginationPage: (state, action) => {
      state.currentPaginationPage = action.payload;
    },
  },
});

export const { changePaginationPage } = appSlice.actions;

const selectAppState = (state: State) => state[NameSpace.App];

export const selectCurrentPaginationPage = (state: State) => selectAppState(state).currentPaginationPage;
