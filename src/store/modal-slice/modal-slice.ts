import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { State } from '../../types/state';
import { NameSpace } from '../../utils/const';

interface InitialState {
  reviewModalActive: boolean;
  reviewSuccessModalActive: boolean;

  cardModalAdd: boolean;
  cardModalAddSuccess: boolean;
  cardModalDelete: boolean;
}

const initialState: InitialState = {
  reviewModalActive: false,
  reviewSuccessModalActive: false,

  cardModalAdd: false,
  cardModalAddSuccess: false,
  cardModalDelete: false,
};

export const modalSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeReviewModalActive: (state, action: PayloadAction<boolean>) => {
      state.reviewModalActive = action.payload;
    },
    changeReviewSuccessModalActive: (state, action: PayloadAction<boolean>) => {
      state.reviewSuccessModalActive = action.payload;
    },
    changeCardModalAdd: (state, action: PayloadAction<boolean>) => {
      state.cardModalAdd = action.payload;
    },
    changeCardModalAddSuccess: (state, action: PayloadAction<boolean>) => {
      state.cardModalAddSuccess = action.payload;
    },
    changeCardModalDelete: (state, action: PayloadAction<boolean>) => {
      state.cardModalDelete = action.payload;
    },
    closeAllModal: () => initialState,
  },
});

export const {
  changeReviewModalActive,
  changeReviewSuccessModalActive,
  changeCardModalAdd,
  changeCardModalAddSuccess,
  changeCardModalDelete,
  closeAllModal,
} = modalSlice.actions;

const selectAppState = (state: State) => state[NameSpace.App];

export const selectReviewModalActive = (state: State) => selectAppState(state).reviewModalActive;
export const selectReviewSuccessModalActive = (state: State) => selectAppState(state).reviewSuccessModalActive;
export const selectCardModalAdd = (state: State) => selectAppState(state).cardModalAdd;
export const selectCardModalAddSuccess = (state: State) => selectAppState(state).cardModalAddSuccess;
export const selectCardModalDelete = (state: State) => selectAppState(state).cardModalDelete;
