import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { State } from '../../types/state';
import { MenuLabel, NameSpace } from '../../utils/const';

interface InitialState {
  currentPage: MenuLabel;
}

const initialState: InitialState = {
  currentPage: MenuLabel.Catalog,
};

export const appSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCurrentPage: (state, action: PayloadAction<MenuLabel>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { changeCurrentPage } = appSlice.actions;

const selectAppState = (state: State) => state[NameSpace.App];

export const selectCurrentPage = (state: State) => selectAppState(state).currentPage;
