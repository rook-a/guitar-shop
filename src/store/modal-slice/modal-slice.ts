import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { State } from '../../types/state';
import { NameSpace } from '../../utils/const';

interface InitialState {
  reviewModalActive: boolean;
  reviewSuccessModalActive: boolean;

  cartAddModalActive: boolean;
  cartAddSuccessModalActive: boolean;
  cartDeleteModalActive: boolean;
}

const initialState: InitialState = {
  reviewModalActive: false,
  reviewSuccessModalActive: false,

  cartAddModalActive: false,
  cartAddSuccessModalActive: false,
  cartDeleteModalActive: false,
};

export const modalSlice = createSlice({
  name: NameSpace.Modal,
  initialState,
  reducers: {
    changeReviewModalActive: (state, action: PayloadAction<boolean>) => {
      state.reviewModalActive = action.payload;
    },
    changeReviewSuccessModalActive: (state, action: PayloadAction<boolean>) => {
      state.reviewSuccessModalActive = action.payload;
    },
    changeCartAddModalActive: (state, action: PayloadAction<boolean>) => {
      state.cartAddModalActive = action.payload;
    },
    changeCartAddSuccessModalActive: (state, action: PayloadAction<boolean>) => {
      state.cartAddSuccessModalActive = action.payload;
    },
    changeCartDeleteModalActive: (state, action: PayloadAction<boolean>) => {
      state.cartDeleteModalActive = action.payload;
    },
    closeAllModal: () => initialState,
  },
});

export const {
  changeReviewModalActive,
  changeReviewSuccessModalActive,
  changeCartAddModalActive,
  changeCartAddSuccessModalActive,
  changeCartDeleteModalActive,
  closeAllModal,
} = modalSlice.actions;

const selectModalState = (state: State) => state[NameSpace.Modal];

export const selectReviewModalActive = (state: State) => selectModalState(state).reviewModalActive;
export const selectReviewSuccessModalActive = (state: State) => selectModalState(state).reviewSuccessModalActive;
export const selectCartAddModalActive = (state: State) => selectModalState(state).cartAddModalActive;
export const selectCartAddSuccessModalActive = (state: State) => selectModalState(state).cartAddSuccessModalActive;
export const selectCartDeleteModalActive = (state: State) => selectModalState(state).cartDeleteModalActive;
